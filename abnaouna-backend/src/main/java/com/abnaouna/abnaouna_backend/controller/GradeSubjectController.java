package com.abnaouna.abnaouna_backend.controller;

import com.abnaouna.abnaouna_backend.dto.request.GradeRequest;
import com.abnaouna.abnaouna_backend.dto.request.SubjectRequest;
import com.abnaouna.abnaouna_backend.entity.Grade;
import com.abnaouna.abnaouna_backend.entity.Subject;
import com.abnaouna.abnaouna_backend.service.GradeService;
import com.abnaouna.abnaouna_backend.service.SubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class GradeSubjectController {

    private final GradeService gradeService;
    private final SubjectService subjectService;

    // ==================== Grades ====================

    @GetMapping("/grades")
    public ResponseEntity<List<Grade>> getAllGrades() {
        return ResponseEntity.ok(gradeService.getAllGrades());
    }

    @GetMapping("/grades/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        return ResponseEntity.ok(gradeService.getGradeById(id));
    }

    @PostMapping("/grades")
    public ResponseEntity<Grade> createGrade(@Valid @RequestBody GradeRequest request) {
        Grade grade = gradeService.createGrade(request.getName(), request.getLevel());
        return ResponseEntity.status(HttpStatus.CREATED).body(grade);
    }

    @PutMapping("/grades/{id}")
    public ResponseEntity<Grade> updateGrade(
            @PathVariable Long id,
            @Valid @RequestBody GradeRequest request) {
        Grade grade = gradeService.updateGrade(id, request.getName(), request.getLevel());
        return ResponseEntity.ok(grade);
    }

    @DeleteMapping("/grades/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        gradeService.deleteGrade(id);
        return ResponseEntity.noContent().build();
    }

    // ==================== Subjects ====================

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/subjects/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    @PostMapping("/subjects")
    public ResponseEntity<Subject> createSubject(@Valid @RequestBody SubjectRequest request) {
        Subject subject = subjectService.createSubject(request.getName(), request.getNameAr());
        return ResponseEntity.status(HttpStatus.CREATED).body(subject);
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<Subject> updateSubject(
            @PathVariable Long id,
            @Valid @RequestBody SubjectRequest request) {
        Subject subject = subjectService.updateSubject(id, request.getName(), request.getNameAr());
        return ResponseEntity.ok(subject);
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}
