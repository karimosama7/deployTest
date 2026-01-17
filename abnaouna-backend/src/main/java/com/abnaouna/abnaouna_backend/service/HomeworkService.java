package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.request.HomeworkRequest;
import com.abnaouna.abnaouna_backend.dto.response.HomeworkResponse;
import com.abnaouna.abnaouna_backend.dto.response.HomeworkSubmissionResponse;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeworkService {

    private final HomeworkRepository homeworkRepository;
    private final HomeworkSubmissionRepository submissionRepository;
    private final ClassSessionRepository classSessionRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public HomeworkResponse createHomework(HomeworkRequest request) {
        ClassSession classSession = classSessionRepository.findById(request.getClassSessionId())
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        Homework homework = Homework.builder()
                .classSession(classSession)
                .title(request.getTitle())
                .description(request.getDescription())
                .homeworkUrl(request.getHomeworkUrl())
                .dueDate(request.getDueDate())
                .build();
        
        homework = homeworkRepository.save(homework);
        return mapToResponse(homework);
    }

    public List<HomeworkResponse> getClassHomework(Long classId) {
        return homeworkRepository.findByClassSessionId(classId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public HomeworkResponse getHomeworkById(Long homeworkId) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new RuntimeException("Homework not found"));
        return mapToResponse(homework);
    }

    @Transactional
    public HomeworkResponse updateHomework(Long homeworkId, HomeworkRequest request) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new RuntimeException("Homework not found"));
        
        homework.setTitle(request.getTitle());
        homework.setDescription(request.getDescription());
        homework.setHomeworkUrl(request.getHomeworkUrl());
        homework.setDueDate(request.getDueDate());
        
        homework = homeworkRepository.save(homework);
        return mapToResponse(homework);
    }

    @Transactional
    public void deleteHomework(Long homeworkId) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new RuntimeException("Homework not found"));
        homeworkRepository.delete(homework);
    }

    // === Submission methods ===

    @Transactional
    public HomeworkSubmissionResponse submitHomework(Long studentId, Long homeworkId, String solutionUrl) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new RuntimeException("Homework not found"));
        
        // Check if already submitted
        HomeworkSubmission submission = submissionRepository
                .findByHomeworkIdAndStudentId(homeworkId, studentId)
                .orElse(HomeworkSubmission.builder()
                        .homework(homework)
                        .student(student)
                        .build());
        
        submission.setSolutionUrl(solutionUrl);
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setStatus(HomeworkSubmission.SubmissionStatus.SUBMITTED);
        
        // Check if late
        if (LocalDateTime.now().isAfter(homework.getDueDate())) {
            // Still allow submission but mark as late (could add a flag)
        }
        
        submission = submissionRepository.save(submission);
        return mapToSubmissionResponse(submission);
    }

    public List<HomeworkSubmissionResponse> getHomeworkSubmissions(Long homeworkId) {
        return submissionRepository.findByHomeworkId(homeworkId).stream()
                .map(this::mapToSubmissionResponse)
                .collect(Collectors.toList());
    }

    public List<HomeworkSubmissionResponse> getStudentSubmissions(Long studentId) {
        return submissionRepository.findByStudentId(studentId).stream()
                .map(this::mapToSubmissionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public HomeworkSubmissionResponse gradeSubmission(Long submissionId, BigDecimal grade, String feedback) {
        HomeworkSubmission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        
        submission.setGrade(grade);
        submission.setFeedback(feedback);
        submission.setStatus(HomeworkSubmission.SubmissionStatus.REVIEWED);
        submission.setIsCompleted(true);
        
        submission = submissionRepository.save(submission);
        return mapToSubmissionResponse(submission);
    }

    private HomeworkResponse mapToResponse(Homework homework) {
        List<HomeworkSubmission> submissions = submissionRepository.findByHomeworkId(homework.getId());
        int totalSubmissions = submissions.size();
        int gradedSubmissions = (int) submissions.stream()
                .filter(s -> s.getStatus() == HomeworkSubmission.SubmissionStatus.REVIEWED)
                .count();
        
        return HomeworkResponse.builder()
                .id(homework.getId())
                .title(homework.getTitle())
                .description(homework.getDescription())
                .homeworkUrl(homework.getHomeworkUrl())
                .dueDate(homework.getDueDate())
                .createdAt(homework.getCreatedAt())
                .classSessionId(homework.getClassSession().getId())
                .classTitle(homework.getClassSession().getTitle())
                .subjectName(homework.getClassSession().getSubject().getName())
                .totalSubmissions(totalSubmissions)
                .gradedSubmissions(gradedSubmissions)
                .build();
    }

    private HomeworkSubmissionResponse mapToSubmissionResponse(HomeworkSubmission submission) {
        return HomeworkSubmissionResponse.builder()
                .id(submission.getId())
                .homeworkId(submission.getHomework().getId())
                .homeworkTitle(submission.getHomework().getTitle())
                .studentId(submission.getStudent().getId())
                .studentName(submission.getStudent().getUser().getFullName())
                .solutionUrl(submission.getSolutionUrl())
                .submittedAt(submission.getSubmittedAt())
                .status(submission.getStatus())
                .isCompleted(submission.getIsCompleted())
                .grade(submission.getGrade())
                .feedback(submission.getFeedback())
                .build();
    }
}
