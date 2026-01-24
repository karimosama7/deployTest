package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.request.ExamRequest;
import com.abnaouna.abnaouna_backend.dto.response.ExamResponse;
import com.abnaouna.abnaouna_backend.dto.response.ExamResultResponse;
import com.abnaouna.abnaouna_backend.dto.response.StudentExamExecutionResponse;
import com.abnaouna.abnaouna_backend.dto.response.StudentExamResultResponse;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final ExamResultRepository resultRepository;
    private final ClassSessionRepository classSessionRepository;
    private final StudentRepository studentRepository;
    private final GradeRepository gradeRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherRepository teacherRepository;
    private final NotificationService notificationService;
    private final ExamQuestionRepository examQuestionRepository;
    private final StudentExamExecutionRepository executionRepository;

    private static final BigDecimal PASSING_GRADE = new BigDecimal("50");

    @Transactional
    public ExamResponse createExam(ExamRequest request, Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Grade grade = gradeRepository.findById(request.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        List<ClassSession> classSessions = new ArrayList<>();
        if (request.getClassSessionIds() != null && !request.getClassSessionIds().isEmpty()) {
            classSessions = classSessionRepository.findAllById(request.getClassSessionIds());
        }

        Exam exam = Exam.builder()
                .teacher(teacher)
                .grade(grade)
                .subject(subject)
                .classSessions(classSessions)
                .title(request.getTitle())
                .formUrl(request.getFormUrl())
                .examDate(request.getExamDate())
                .durationMinutes(request.getDurationMinutes())
                .totalMarks(request.getTotalMarks())
                .passingScore(request.getPassingScore())
                .resultConfiguration(request.getResultConfiguration() != null
                        ? ExamResultConfig.valueOf(request.getResultConfiguration())
                        : ExamResultConfig.MANUAL)
                .published(request.isPublished())
                .endDate(request.getDurationMinutes() != null
                        ? request.getExamDate().plusMinutes(request.getDurationMinutes())
                        : request.getEndDate())
                .build();

        exam = examRepository.save(exam);

        if (request.getQuestions() != null && !request.getQuestions().isEmpty()) {
            List<ExamQuestion> questions = new ArrayList<>();
            for (ExamRequest.QuestionRequest qRequest : request.getQuestions()) {
                ExamQuestion question = ExamQuestion.builder()
                        .exam(exam)
                        .text(qRequest.getText())
                        .imageUrl(qRequest.getImageUrl())
                        .marks(qRequest.getMarks())
                        .questionType(ExamQuestion.QuestionType.valueOf(qRequest.getQuestionType()))
                        .sortOrder(qRequest.getSortOrder())
                        .build();

                List<ExamOption> options = new ArrayList<>();
                if (qRequest.getOptions() != null) {
                    for (ExamRequest.OptionRequest oRequest : qRequest.getOptions()) {
                        options.add(ExamOption.builder()
                                .question(question)
                                .text(oRequest.getText())
                                .imageUrl(oRequest.getImageUrl())
                                .isCorrect(oRequest.isCorrect())
                                .build());
                    }
                }
                question.setOptions(options);
                questions.add(question);
            }
            examQuestionRepository.saveAll(questions);
        }

        // Initialize results for all students in grade
        initializeResultsForExam(exam.getId());

        return mapToResponse(exam);
    }

    public List<ExamResponse> getTeacherExams(Long teacherId) {
        return examRepository.findByTeacherIdOrderByExamDateDesc(teacherId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Deprecated or kept for legacy support?
    // public List<ExamResponse> getClassExams(Long classId) ...

    public List<ExamResponse> getClassExams(Long classId) {
        // Need to join table query, for now using simpler approach if repo supports it
        // or filter in memory
        // Ideally ExamRepository should have findByClassSessions_Id(Long classId)
        return examRepository.findByClassSessions_Id(classId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ExamResponse getExamById(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        return mapToResponse(exam);
    }

    @Transactional
    public StudentExamExecutionResponse startExam(Long studentId, Long examId) {
        // Check if already started
        Optional<StudentExamExecution> existing = executionRepository.findByExamIdAndStudentId(examId, studentId);
        if (existing.isPresent()) {
            return mapToExecutionResponse(existing.get());
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (exam.getExamDate().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Exam has not started yet");
        }

        if (exam.getEndDate() != null && exam.getEndDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Exam has expired");
        }

        StudentExamExecution execution = StudentExamExecution.builder()
                .student(student)
                .exam(exam)
                .startedAt(LocalDateTime.now())
                .status(StudentExamExecution.ExecutionStatus.IN_PROGRESS)
                .build();

        execution = executionRepository.save(execution);
        return mapToExecutionResponse(execution);
    }

    private StudentExamExecutionResponse mapToExecutionResponse(StudentExamExecution execution) {
        Exam exam = execution.getExam();
        List<ExamQuestion> questions = examQuestionRepository.findByExamIdOrderBySortOrderAsc(exam.getId());

        List<StudentExamExecutionResponse.QuestionResponse> questionResponses = questions.stream()
                .map(q -> StudentExamExecutionResponse.QuestionResponse.builder()
                        .id(q.getId())
                        .text(q.getText())
                        .imageUrl(q.getImageUrl())
                        .marks(q.getMarks())
                        .questionType(q.getQuestionType().name())
                        .sortOrder(q.getSortOrder())
                        .options(q.getOptions().stream()
                                .map(o -> StudentExamExecutionResponse.OptionResponse.builder()
                                        .id(o.getId())
                                        .text(o.getText())
                                        .imageUrl(o.getImageUrl())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        return StudentExamExecutionResponse.builder()
                .executionId(execution.getId())
                .examId(exam.getId())
                .title(exam.getTitle())
                .durationMinutes(exam.getDurationMinutes())
                .totalMarks(exam.getTotalMarks())
                .startedAt(execution.getStartedAt())
                .endDate(exam.getEndDate())
                .questions(questionResponses)
                .build();
    }

    @Transactional
    public StudentExamResultResponse submitExam(Long executionId, Map<Long, Long> answers) {
        StudentExamExecution execution = executionRepository.findById(executionId)
                .orElseThrow(() -> new RuntimeException("Execution not found"));

        if (execution.getStatus() != StudentExamExecution.ExecutionStatus.IN_PROGRESS) {
            // If already submitted, just return the result
            if (execution.getStatus() == StudentExamExecution.ExecutionStatus.COMPLETED ||
                    execution.getStatus() == StudentExamExecution.ExecutionStatus.EXPIRED) {
                return mapToResultResponse(execution);
            }
            throw new RuntimeException("Exam invalid status: " + execution.getStatus());
        }

        // Validate time (Allow 1 minute grace period)
        LocalDateTime now = LocalDateTime.now();

        // Calculate due time as MIN(Started + Duration, Exam End Date)
        LocalDateTime examEndDate = execution.getExam().getEndDate();
        LocalDateTime durationEndDate = execution.getStartedAt().plusMinutes(execution.getExam().getDurationMinutes());

        LocalDateTime effectiveEndDate = durationEndDate;
        if (examEndDate != null && examEndDate.isBefore(durationEndDate)) {
            effectiveEndDate = examEndDate;
        }

        LocalDateTime dueTime = effectiveEndDate.plusMinutes(1); // 1 min grace

        if (now.isAfter(dueTime)) {
            execution.setStatus(StudentExamExecution.ExecutionStatus.EXPIRED);
            // We still grade it even if expired, but status is EXPIRED
        } else {
            execution.setStatus(StudentExamExecution.ExecutionStatus.COMPLETED);
        }

        execution.setSubmittedAt(now);

        // Calculate Score
        BigDecimal totalScore = BigDecimal.ZERO;
        List<ExamQuestion> questions = examQuestionRepository
                .findByExamIdOrderBySortOrderAsc(execution.getExam().getId());

        for (ExamQuestion question : questions) {
            Long selectedOptionId = answers.get(question.getId());
            if (selectedOptionId != null) {
                // Find correct option
                boolean isCorrect = question.getOptions().stream()
                        .filter(opt -> opt.getId().equals(selectedOptionId))
                        .findFirst()
                        .map(ExamOption::isCorrect)
                        .orElse(false);

                if (isCorrect) {
                    totalScore = totalScore.add(new BigDecimal(question.getMarks()));
                }
            }
        }

        execution.setScore(totalScore);

        // Save Answers as JSON (Simple fallback)
        execution.setAnswersJson(answers.toString());

        execution = executionRepository.save(execution);

        // Sync with Legacy ExamResult System
        ExamResult result = resultRepository
                .findByExamIdAndStudentId(execution.getExam().getId(), execution.getStudent().getId())
                .orElse(ExamResult.builder()
                        .exam(execution.getExam())
                        .student(execution.getStudent())
                        .build());

        result.setGrade(totalScore);
        result.setSubmittedAt(now);
        result.setStatus(ExamResult.ExamStatus.COMPLETED);
        resultRepository.save(result);

        return mapToResultResponse(execution);
    }

    private StudentExamResultResponse mapToResultResponse(StudentExamExecution execution) {
        String feedback = "Good Effort";
        if (execution.getScore() != null) {
            double percentage = execution.getScore().doubleValue() / execution.getExam().getTotalMarks() * 100;
            if (percentage >= 90)
                feedback = "Excellent!";
            else if (percentage >= 75)
                feedback = "Very Good!";
            else if (percentage >= 50)
                feedback = "Good";
            else
                feedback = "Keep Practicing";
        }

        return StudentExamResultResponse.builder()
                .executionId(execution.getId())
                .examId(execution.getExam().getId())
                .title(execution.getExam().getTitle())
                .score(execution.getScore())
                .totalMarks(execution.getExam().getTotalMarks())
                .submittedAt(execution.getSubmittedAt())
                .status(execution.getStatus().name())
                .feedback(feedback)
                .build();
    }

    @Transactional
    public ExamResponse updateExam(Long examId, ExamRequest request) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        exam.setTitle(request.getTitle());
        exam.setFormUrl(request.getFormUrl());
        exam.setExamDate(request.getExamDate());
        exam.setDurationMinutes(request.getDurationMinutes());
        exam.setTotalMarks(request.getTotalMarks());
        exam.setPassingScore(request.getPassingScore());
        exam.setResultConfiguration(
                request.getResultConfiguration() != null ? ExamResultConfig.valueOf(request.getResultConfiguration())
                        : ExamResultConfig.MANUAL);
        if (request.getDurationMinutes() != null && request.getExamDate() != null) {
            exam.setEndDate(request.getExamDate().plusMinutes(request.getDurationMinutes()));
        } else {
            exam.setEndDate(request.getEndDate());
        }

        if (request.getClassSessionIds() != null) {
            List<ClassSession> classes = classSessionRepository.findAllById(request.getClassSessionIds());
            exam.setClassSessions(classes);
        }

        exam = examRepository.save(exam);
        return mapToResponse(exam);
    }

    @Transactional
    public void deleteExam(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        examRepository.delete(exam);
    }

    // === Exam Results / Grades ===

    @Transactional
    public List<ExamResultResponse> enterGrades(Long examId, Map<Long, BigDecimal> studentGrades) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<ExamResult> results = new ArrayList<>();

        for (Map.Entry<Long, BigDecimal> entry : studentGrades.entrySet()) {
            Long studentId = entry.getKey();
            BigDecimal grade = entry.getValue();

            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));

            // Check if result already exists
            ExamResult result = resultRepository.findByExamIdAndStudentId(examId, studentId)
                    .orElse(ExamResult.builder()
                            .exam(exam)
                            .student(student)
                            .build());

            BigDecimal oldGrade = result.getGrade();
            result.setGrade(grade);
            result.setGradedAt(LocalDateTime.now());

            // Set status based on grade
            if (grade.compareTo(PASSING_GRADE) < 0) {
                result.setStatus(ExamResult.ExamStatus.FAILED);
            } else {
                result.setStatus(ExamResult.ExamStatus.COMPLETED);
            }

            results.add(resultRepository.save(result));

            // Notify Parent (avoid duplicate if simply updating details, but here we assume
            // entered = result ready)
            // Consider only notifying if grade wasn't set or changed meaningfully
            if (oldGrade == null && student.getParent() != null) {
                notificationService.createNotification(
                        student.getParent(),
                        student,
                        "نتيجة الامتحان",
                        String.format("ظهرت نتيجة امتحان %s للطالب %s. الدرجة: %s",
                                exam.getTitle(),
                                student.getUser().getFullName(),
                                grade.toString()),
                        Notification.NotificationType.EXAM_RESULT);
            }
        }

        return results.stream()
                .map(this::mapToResultResponse)
                .collect(Collectors.toList());
    }

    public List<ExamResultResponse> getExamResults(Long examId) {
        return resultRepository.findByExamId(examId).stream()
                .map(this::mapToResultResponse)
                .collect(Collectors.toList());
    }

    public List<ExamResultResponse> getStudentResults(Long studentId) {
        List<ExamResult> results = resultRepository.findByStudentId(studentId);

        // Update status for exams that are past due but not graded
        for (ExamResult result : results) {
            if (result.getStatus() == ExamResult.ExamStatus.PENDING) {
                LocalDateTime endDate = result.getExam().getEndDate();
                if (endDate == null && result.getExam().getDurationMinutes() != null) {
                    endDate = result.getExam().getExamDate().plusMinutes(result.getExam().getDurationMinutes());
                }

                if (endDate != null && endDate.isBefore(LocalDateTime.now())) {
                    result.setStatus(ExamResult.ExamStatus.LATE);
                    resultRepository.save(result);
                }
            }
        }

        return results.stream()
                .map(this::mapToResultResponse)
                .collect(Collectors.toList());
    }

    // Initialize exam results for all students in grade when exam is created
    @Transactional
    public void initializeResultsForExam(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Long gradeId;
        if (exam.getGrade() != null) {
            gradeId = exam.getGrade().getId();
        } else if (!exam.getClassSessions().isEmpty()) {
            // For now, take grade from first class, assuming mixed grades aren't common in
            // one exam or handle all
            gradeId = exam.getClassSessions().get(0).getGrade().getId();
        } else {
            return; // Should not happen
        }
        List<Student> students = studentRepository.findByGradeId(gradeId);

        for (Student student : students) {
            if (!resultRepository.findByExamIdAndStudentId(examId, student.getId()).isPresent()) {
                ExamResult result = ExamResult.builder()
                        .exam(exam)
                        .student(student)
                        .status(ExamResult.ExamStatus.PENDING)
                        .build();
                resultRepository.save(result);
            }
        }
    }

    private ExamResponse mapToResponse(Exam exam) {
        List<ExamResult> results = resultRepository.findByExamId(exam.getId());
        int totalStudents = results.size();
        int gradedStudents = (int) results.stream()
                .filter(r -> r.getGrade() != null)
                .count();

        Double averageGrade = null;
        if (gradedStudents > 0) {
            BigDecimal sum = results.stream()
                    .filter(r -> r.getGrade() != null)
                    .map(ExamResult::getGrade)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            averageGrade = sum.divide(new BigDecimal(gradedStudents), 2, RoundingMode.HALF_UP).doubleValue();
        }

        ExamResponse.ExamResponseBuilder builder = ExamResponse.builder()
                .id(exam.getId())
                .title(exam.getTitle())
                .formUrl(exam.getFormUrl())
                .examDate(exam.getExamDate())
                .createdAt(exam.getCreatedAt())
                .totalStudents(totalStudents)
                .gradedStudents(gradedStudents)
                .averageGrade(averageGrade);

        if (exam.getGrade() != null) {
            builder.classTitle(exam.getGrade().getName()); // Use Grade name as "Class Title" context
            builder.classSessionId(null); // No specific session
        } else if (!exam.getClassSessions().isEmpty()) {
            String titles = exam.getClassSessions().stream()
                    .map(ClassSession::getTitle)
                    .collect(Collectors.joining(", "));
            builder.classTitle(titles);
            builder.classSessionId(exam.getClassSessions().get(0).getId()); // First one as legacy ID
        }

        if (exam.getSubject() != null) {
            builder.subjectName(exam.getSubject().getNameAr()); // Prefer Arabic name
        } else if (!exam.getClassSessions().isEmpty()) {
            builder.subjectName(exam.getClassSessions().get(0).getSubject().getNameAr());
        }

        builder.durationMinutes(exam.getDurationMinutes());
        builder.totalMarks(exam.getTotalMarks());
        builder.passingScore(exam.getPassingScore());
        builder.resultConfiguration(exam.getResultConfiguration().name());
        builder.endDate(exam.getEndDate());

        return builder.build();
    }

    private ExamResultResponse mapToResultResponse(ExamResult result) {
        return ExamResultResponse.builder()
                .id(result.getId())
                .examId(result.getExam().getId())
                .examTitle(result.getExam().getTitle())
                .studentId(result.getStudent().getId())
                .studentName(result.getStudent().getUser().getFullName())
                .grade(result.getGrade())
                .status(result.getStatus())
                .submittedAt(result.getSubmittedAt())
                .gradedAt(result.getGradedAt())
                .build();
    }

    @Transactional
    public ExamResponse duplicateExam(Long examId, Long teacherId, LocalDateTime newDate) {
        Exam original = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (!original.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized to duplicate this exam");
        }

        // 1. Copy Exam Entity
        Exam newExam = Exam.builder()
                .teacher(original.getTeacher())
                .grade(original.getGrade())
                .subject(original.getSubject())
                .classSessions(new ArrayList<>(original.getClassSessions())) // Same classes
                .title(original.getTitle() + " (Copy)")
                .formUrl(original.getFormUrl())
                .examDate(newDate)
                .durationMinutes(original.getDurationMinutes())
                .totalMarks(original.getTotalMarks())
                .passingScore(original.getPassingScore())
                .resultConfiguration(original.getResultConfiguration())
                .published(true) // Auto-publish
                .endDate(newDate.plusMinutes(original.getDurationMinutes()))
                .build();

        newExam = examRepository.save(newExam);

        // 2. Copy Questions & Options
        List<ExamQuestion> originalQuestions = examQuestionRepository.findByExamIdOrderBySortOrderAsc(original.getId());
        List<ExamQuestion> newQuestions = new ArrayList<>();

        for (ExamQuestion q : originalQuestions) {
            ExamQuestion newQ = ExamQuestion.builder()
                    .exam(newExam)
                    .text(q.getText())
                    .imageUrl(q.getImageUrl())
                    .marks(q.getMarks())
                    .questionType(q.getQuestionType())
                    .sortOrder(q.getSortOrder())
                    .build();

            // Note: We need to save questions first if not cascading, but let's build graph
            List<ExamOption> newOptions = new ArrayList<>();
            if (q.getOptions() != null) {
                for (ExamOption o : q.getOptions()) {
                    newOptions.add(ExamOption.builder()
                            .question(newQ) // Link back
                            .text(o.getText())
                            .imageUrl(o.getImageUrl())
                            .isCorrect(o.isCorrect())
                            .build());
                }
            }
            newQ.setOptions(newOptions);
            newQuestions.add(newQ);
        }
        examQuestionRepository.saveAll(newQuestions);

        // 3. Initialize Results
        initializeResultsForExam(newExam.getId());

        return mapToResponse(newExam);
    }
}
