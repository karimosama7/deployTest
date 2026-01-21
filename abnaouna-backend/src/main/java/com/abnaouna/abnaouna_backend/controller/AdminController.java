package com.abnaouna.abnaouna_backend.controller;

import com.abnaouna.abnaouna_backend.dto.request.AssignChildrenRequest;
import com.abnaouna.abnaouna_backend.dto.request.CreateUserRequest;
import com.abnaouna.abnaouna_backend.dto.response.StudentReportResponse;
import com.abnaouna.abnaouna_backend.dto.response.UserResponse;
import com.abnaouna.abnaouna_backend.entity.User;
import com.abnaouna.abnaouna_backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // ==================== User Management ====================

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<UserResponse>> getUsersByRole(@PathVariable User.Role role) {
        return ResponseEntity.ok(adminService.getUsersByRole(role));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }

    @PostMapping("/users")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createUser(request));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(adminService.updateUser(id, request));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/activate")
    public ResponseEntity<UserResponse> activateUser(
            @PathVariable Long id,
            @RequestParam boolean active) {
        return ResponseEntity.ok(adminService.activateUser(id, active));
    }

    @PutMapping("/users/{id}/reset-password")
    public ResponseEntity<UserResponse> resetPassword(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.resetPassword(id));
    }

    // ==================== Teachers ====================

    @GetMapping("/teachers")
    public ResponseEntity<List<UserResponse>> getAllTeachers() {
        return ResponseEntity.ok(adminService.getUsersByRole(User.Role.TEACHER));
    }

    @PostMapping("/teachers")
    public ResponseEntity<UserResponse> createTeacher(@Valid @RequestBody CreateUserRequest request) {
        request.setRole(User.Role.TEACHER);
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createUser(request));
    }

    // ==================== Students ====================

    @GetMapping("/students")
    public ResponseEntity<List<UserResponse>> getAllStudents() {
        return ResponseEntity.ok(adminService.getUsersByRole(User.Role.STUDENT));
    }

    @PostMapping("/students")
    public ResponseEntity<UserResponse> createStudent(@Valid @RequestBody CreateUserRequest request) {
        request.setRole(User.Role.STUDENT);
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createUser(request));
    }

    @GetMapping("/students/search")
    public ResponseEntity<List<UserResponse>> searchStudents(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Long gradeId) {
        return ResponseEntity.ok(adminService.searchStudents(query, gradeId));
    }

    @GetMapping("/students/{id}/report")
    public ResponseEntity<StudentReportResponse> getStudentReport(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getStudentReport(id));
    }

    // ==================== Parents ====================

    @GetMapping("/parents")
    public ResponseEntity<List<UserResponse>> getAllParents() {
        return ResponseEntity.ok(adminService.getUsersByRole(User.Role.PARENT));
    }

    @PostMapping("/parents")
    public ResponseEntity<UserResponse> createParent(@Valid @RequestBody CreateUserRequest request) {
        request.setRole(User.Role.PARENT);
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createUser(request));
    }

    @PostMapping("/parents/{parentId}/children")
    public ResponseEntity<Void> assignChildrenToParent(
            @PathVariable Long parentId,
            @RequestBody AssignChildrenRequest request) {
        adminService.assignChildrenToParent(parentId, request.getChildIds());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/parents/{parentId}/children/{childId}")
    public ResponseEntity<Void> removeChildFromParent(
            @PathVariable Long parentId,
            @PathVariable Long childId) {
        adminService.removeChildFromParent(parentId, childId);
        return ResponseEntity.noContent().build();
    }

    // ==================== Statistics ====================

    @GetMapping("/stats/students-per-grade")
    public ResponseEntity<Map<String, Long>> getStudentCountByGrade() {
        return ResponseEntity.ok(adminService.getStudentCountByGrade());
    }
}

