package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.request.ExamRequest;
import com.abnaouna.abnaouna_backend.dto.response.ExamResponse;
import com.abnaouna.abnaouna_backend.dto.response.ExamResultResponse;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final ExamResultRepository resultRepository;
    private final ClassSessionRepository classSessionRepository;
    private final StudentRepository studentRepository;

    private static final BigDecimal PASSING_GRADE = new BigDecimal("50");

    @Transactional
    public ExamResponse createExam(ExamRequest request) {
        ClassSession classSession = classSessionRepository.findById(request.getClassSessionId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        Exam exam = Exam.builder()
                .classSession(classSession)
                .title(request.getTitle())
                .formUrl(request.getFormUrl())
                .examDate(request.getExamDate())
                .build();
        
        exam = examRepository.save(exam);
        return mapToResponse(exam);
    }

    public List<ExamResponse> getClassExams(Long classId) {
        return examRepository.findByClassSessionId(classId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ExamResponse getExamById(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        return mapToResponse(exam);
    }

    @Transactional
    public ExamResponse updateExam(Long examId, ExamRequest request) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        
        exam.setTitle(request.getTitle());
        exam.setFormUrl(request.getFormUrl());
        exam.setExamDate(request.getExamDate());
        
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
            
            result.setGrade(grade);
            result.setGradedAt(LocalDateTime.now());
            
            // Set status based on grade
            if (grade.compareTo(PASSING_GRADE) < 0) {
                result.setStatus(ExamResult.ExamStatus.FAILED);
            } else {
                result.setStatus(ExamResult.ExamStatus.COMPLETED);
            }
            
            results.add(resultRepository.save(result));
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
                if (result.getExam().getExamDate().isBefore(LocalDate.now())) {
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
        
        Long gradeId = exam.getClassSession().getGrade().getId();
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
        
        return ExamResponse.builder()
                .id(exam.getId())
                .title(exam.getTitle())
                .formUrl(exam.getFormUrl())
                .examDate(exam.getExamDate())
                .createdAt(exam.getCreatedAt())
                .classSessionId(exam.getClassSession().getId())
                .classTitle(exam.getClassSession().getTitle())
                .subjectName(exam.getClassSession().getSubject().getName())
                .totalStudents(totalStudents)
                .gradedStudents(gradedStudents)
                .averageGrade(averageGrade)
                .build();
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
}
