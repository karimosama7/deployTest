package com.abnaouna.abnaouna_backend.controller;

import com.abnaouna.abnaouna_backend.dto.request.HomeworkSubmissionRequest;
import com.abnaouna.abnaouna_backend.dto.response.*;
import com.abnaouna.abnaouna_backend.service.ExamService;
import com.abnaouna.abnaouna_backend.dto.response.StudentExamResultResponse;
import com.abnaouna.abnaouna_backend.entity.Student;
import com.abnaouna.abnaouna_backend.entity.User;
import com.abnaouna.abnaouna_backend.repository.StudentRepository;
import com.abnaouna.abnaouna_backend.repository.UserRepository;
import com.abnaouna.abnaouna_backend.service.HomeworkService;
import com.abnaouna.abnaouna_backend.service.AttendanceService;
import com.abnaouna.abnaouna_backend.service.StudentDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final AttendanceService attendanceService;
    private final ExamService examService;
    private final HomeworkService homeworkService;
    private final StudentDataService studentDataService;
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

    // ==================== Schedule ====================

    @GetMapping("/schedule")
    public ResponseEntity<List<StudentScheduleResponse>> getSchedule(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(studentDataService.getSchedule(studentId));
    }

    @PostMapping("/sessions/{sessionId}/join")
    public ResponseEntity<Void> joinSession(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long sessionId) {
        Long studentId = getStudentId(userDetails);
        attendanceService.recordAttendance(sessionId, studentId);
        return ResponseEntity.ok().build();
    }

    // ==================== Homework ====================

    @GetMapping("/homework")
    public ResponseEntity<List<StudentHomeworkResponse>> getHomework(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(studentDataService.getHomework(studentId));
    }

    @PostMapping("/homework/{homeworkId}/submit")
    public ResponseEntity<HomeworkSubmissionResponse> submitHomework(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long homeworkId,
            @Valid @RequestBody HomeworkSubmissionRequest request) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(homeworkService.submitHomework(studentId, homeworkId, request.getSolutionUrl()));
    }

    // ==================== Exams ====================

    @GetMapping("/exams")
    public ResponseEntity<List<StudentExamResponse>> getExams(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(studentDataService.getExams(studentId));
    }

    @PostMapping("/exams/{examId}/start")
    public ResponseEntity<StudentExamExecutionResponse> startExam(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long examId) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(examService.startExam(studentId, examId));
    }

    @PostMapping("/exams/submit/{executionId}")
    public ResponseEntity<StudentExamResultResponse> submitExam(
            @PathVariable Long executionId,
            @RequestBody java.util.Map<Long, Long> answers) {
        return ResponseEntity.ok(examService.submitExam(executionId, answers));
    }

    // ==================== Attendance ====================

    @GetMapping("/attendance")
    public ResponseEntity<List<StudentAttendanceResponse>> getAttendance(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(studentDataService.getAttendance(studentId));
    }

    @GetMapping("/attendance/summary")
    public ResponseEntity<AttendanceSummary> getAttendanceSummary(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long studentId = getStudentId(userDetails);
        return ResponseEntity.ok(studentDataService.getAttendanceSummary(studentId));
    }
}
