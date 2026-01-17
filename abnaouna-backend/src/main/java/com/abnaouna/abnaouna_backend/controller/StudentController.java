package com.abnaouna.abnaouna_backend.controller;

import com.abnaouna.abnaouna_backend.dto.request.HomeworkSubmissionRequest;
import com.abnaouna.abnaouna_backend.dto.response.HomeworkSubmissionResponse;
import com.abnaouna.abnaouna_backend.entity.Student;
import com.abnaouna.abnaouna_backend.entity.User;
import com.abnaouna.abnaouna_backend.repository.StudentRepository;
import com.abnaouna.abnaouna_backend.repository.UserRepository;
import com.abnaouna.abnaouna_backend.service.HomeworkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final HomeworkService homeworkService;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    // Helper method to get student ID from logged-in user
    private Long getStudentId(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));
        return student.getId();
    }

    // ==================== Homework Submission ====================

    @PostMapping("/homework/{homeworkId}/submit")
    public ResponseEntity<HomeworkSubmissionResponse> submitHomework(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long homeworkId,
            @Valid @RequestBody HomeworkSubmissionRequest request) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(homeworkService.submitHomework(studentId, homeworkId, request.getSolutionUrl()));
    }
}
