package com.abnaouna.abnaouna_backend.controller;

import com.abnaouna.abnaouna_backend.dto.response.*;
import com.abnaouna.abnaouna_backend.entity.Parent;
import com.abnaouna.abnaouna_backend.entity.User;
import com.abnaouna.abnaouna_backend.repository.ParentRepository;
import com.abnaouna.abnaouna_backend.repository.UserRepository;
import com.abnaouna.abnaouna_backend.service.NotificationService;
import com.abnaouna.abnaouna_backend.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parent")
@RequiredArgsConstructor
public class ParentController {

    private final ParentService parentService;
    private final NotificationService notificationService;
    private final ParentRepository parentRepository;
    private final UserRepository userRepository;

    /**
     * Get current parent's ID from authenticated user
     */
    private Long getParentId(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Parent parent = parentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Parent profile not found"));
        return parent.getId();
    }

    // ==================== Children ====================

    /**
     * Get all children linked to this parent
     */
    @GetMapping("/children")
    public ResponseEntity<List<ChildResponse>> getChildren(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChildren(parentId));
    }

    /**
     * Get specific child details
     */
    @GetMapping("/children/{childId}")
    public ResponseEntity<ChildResponse> getChild(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long childId) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChild(parentId, childId));
    }

    // ==================== Child Schedule ====================

    @GetMapping("/children/{childId}/schedule")
    public ResponseEntity<List<StudentScheduleResponse>> getChildSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long childId) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChildSchedule(parentId, childId));
    }

    // ==================== Child Homework ====================

    @GetMapping("/children/{childId}/homework")
    public ResponseEntity<List<StudentHomeworkResponse>> getChildHomework(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long childId) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChildHomework(parentId, childId));
    }

    // ==================== Child Exams ====================

    @GetMapping("/children/{childId}/exams")
    public ResponseEntity<List<StudentExamResponse>> getChildExams(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long childId) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChildExams(parentId, childId));
    }

    // ==================== Child Attendance ====================

    @GetMapping("/children/{childId}/attendance")
    public ResponseEntity<List<StudentAttendanceResponse>> getChildAttendance(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long childId) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChildAttendance(parentId, childId));
    }

    @GetMapping("/children/schedule")
    public ResponseEntity<List<StudentScheduleResponse>> getAllChildrenSchedule(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getAllChildrenUpcomingSchedule(parentId));
    }

    @GetMapping("/children/{childId}/attendance/summary")
    public ResponseEntity<AttendanceSummary> getChildAttendanceSummary(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long childId) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(parentService.getChildAttendanceSummary(parentId, childId));
    }

    // ==================== Notifications ====================

    @GetMapping("/notifications")
    public ResponseEntity<List<NotificationResponse>> getNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(notificationService.getParentNotifications(parentId));
    }

    @PutMapping("/notifications/{id}/read")
    public ResponseEntity<NotificationResponse> markNotificationAsRead(
            @PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @GetMapping("/notifications/unread-count")
    public ResponseEntity<Long> getUnreadCount(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long parentId = getParentId(userDetails);
        return ResponseEntity.ok(notificationService.getUnreadCount(parentId));
    }
}
