package com.abnaouna.abnaouna_backend.controller;

import com.abnaouna.abnaouna_backend.dto.request.*;
import com.abnaouna.abnaouna_backend.dto.response.*;
import com.abnaouna.abnaouna_backend.entity.Student;
import com.abnaouna.abnaouna_backend.entity.Teacher;
import com.abnaouna.abnaouna_backend.entity.User;
import com.abnaouna.abnaouna_backend.repository.TeacherRepository;
import com.abnaouna.abnaouna_backend.repository.UserRepository;
import com.abnaouna.abnaouna_backend.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final ClassSessionService classSessionService;
    private final AttendanceService attendanceService;
    private final HomeworkService homeworkService;
    private final ExamService examService;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    // Helper method to get teacher ID from logged-in user
    private Long getTeacherId(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Teacher teacher = teacherRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Teacher profile not found"));
        return teacher.getId();
    }

    // ==================== Classes ====================

    @GetMapping("/classes")
    public ResponseEntity<List<ClassSessionResponse>> getMyClasses(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long teacherId = getTeacherId(userDetails);
        return ResponseEntity.ok(classSessionService.getTeacherClasses(teacherId));
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<ClassSessionResponse> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(classSessionService.getClassById(id));
    }

    @PostMapping("/classes")
    public ResponseEntity<ClassSessionResponse> createClass(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ClassSessionRequest request) {
        Long teacherId = getTeacherId(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(classSessionService.createClass(teacherId, request));
    }

    @PutMapping("/classes/{id}")
    public ResponseEntity<ClassSessionResponse> updateClass(
            @PathVariable Long id,
            @Valid @RequestBody ClassSessionRequest request) {
        return ResponseEntity.ok(classSessionService.updateClass(id, request));
    }

    @PutMapping("/classes/{id}/meeting-url")
    public ResponseEntity<ClassSessionResponse> updateMeetingUrl(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String meetingUrl = body.get("meetingUrl");
        return ResponseEntity.ok(classSessionService.updateMeetingUrl(id, meetingUrl));
    }

    @PutMapping("/classes/{id}/recording-url")
    public ResponseEntity<ClassSessionResponse> updateRecordingUrl(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String recordingUrl = body.get("recordingUrl");
        return ResponseEntity.ok(classSessionService.updateRecordingUrl(id, recordingUrl));
    }

    @DeleteMapping("/classes/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        classSessionService.deleteClass(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== Attendance ====================

    @GetMapping("/classes/{id}/students")
    public ResponseEntity<List<Map<String, Object>>> getEnrolledStudents(@PathVariable Long id) {
        List<Student> students = attendanceService.getEnrolledStudents(id);
        List<Map<String, Object>> result = students.stream()
                .map(s -> Map.<String, Object>of(
                        "id", s.getId(),
                        "name", s.getUser().getFullName(),
                        "username", s.getUser().getUsername()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/classes/{id}/attendance")
    public ResponseEntity<List<AttendanceResponse>> getClassAttendance(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getClassAttendance(id));
    }

    @PostMapping("/classes/{id}/attendance")
    public ResponseEntity<List<AttendanceResponse>> markAttendance(
            @PathVariable Long id,
            @Valid @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.markAttendance(id, request.getStudentAttendance()));
    }

    // ==================== Homework ====================

    @GetMapping("/classes/{id}/homework")
    public ResponseEntity<List<HomeworkResponse>> getClassHomework(@PathVariable Long id) {
        return ResponseEntity.ok(homeworkService.getClassHomework(id));
    }

    @PostMapping("/homework")
    public ResponseEntity<HomeworkResponse> createHomework(
            @Valid @RequestBody HomeworkRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(homeworkService.createHomework(request));
    }

    @GetMapping("/homework/{id}")
    public ResponseEntity<HomeworkResponse> getHomeworkById(@PathVariable Long id) {
        return ResponseEntity.ok(homeworkService.getHomeworkById(id));
    }

    @PutMapping("/homework/{id}")
    public ResponseEntity<HomeworkResponse> updateHomework(
            @PathVariable Long id,
            @Valid @RequestBody HomeworkRequest request) {
        return ResponseEntity.ok(homeworkService.updateHomework(id, request));
    }

    @DeleteMapping("/homework/{id}")
    public ResponseEntity<Void> deleteHomework(@PathVariable Long id) {
        homeworkService.deleteHomework(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/homework/{id}/submissions")
    public ResponseEntity<List<HomeworkSubmissionResponse>> getHomeworkSubmissions(@PathVariable Long id) {
        return ResponseEntity.ok(homeworkService.getHomeworkSubmissions(id));
    }

    @PutMapping("/submissions/{id}/grade")
    public ResponseEntity<HomeworkSubmissionResponse> gradeSubmission(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        BigDecimal grade = new BigDecimal(body.get("grade").toString());
        String feedback = (String) body.get("feedback");
        return ResponseEntity.ok(homeworkService.gradeSubmission(id, grade, feedback));
    }

    // ==================== Exams ====================

    @GetMapping("/classes/{id}/exams")
    public ResponseEntity<List<ExamResponse>> getClassExams(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getClassExams(id));
    }

    @PostMapping("/exams")
    public ResponseEntity<ExamResponse> createExam(
            @Valid @RequestBody ExamRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(examService.createExam(request));
    }

    @GetMapping("/exams/{id}")
    public ResponseEntity<ExamResponse> getExamById(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @PutMapping("/exams/{id}")
    public ResponseEntity<ExamResponse> updateExam(
            @PathVariable Long id,
            @Valid @RequestBody ExamRequest request) {
        return ResponseEntity.ok(examService.updateExam(id, request));
    }

    @DeleteMapping("/exams/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exams/{id}/results")
    public ResponseEntity<List<ExamResultResponse>> getExamResults(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamResults(id));
    }

    @PostMapping("/exams/{id}/grades")
    public ResponseEntity<List<ExamResultResponse>> enterGrades(
            @PathVariable Long id,
            @Valid @RequestBody ExamGradeRequest request) {
        return ResponseEntity.ok(examService.enterGrades(id, request.getStudentGrades()));
    }
}
