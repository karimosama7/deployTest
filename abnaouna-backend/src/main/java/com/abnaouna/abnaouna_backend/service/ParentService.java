package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.response.*;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentService {

    private final ParentRepository parentRepository;
    private final StudentRepository studentRepository;
    private final StudentDataService studentDataService;

    /**
     * Get all children for a parent
     */
    public List<ChildResponse> getChildren(Long parentId) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        
        return parent.getChildren().stream()
                .map(this::mapToChildResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get child details (verify parent-child relationship)
     */
    public ChildResponse getChild(Long parentId, Long childId) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        
        Student child = parent.getChildren().stream()
                .filter(s -> s.getId().equals(childId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Child not found or not linked to this parent"));
        
        return mapToChildResponse(child);
    }

    /**
     * Get child's schedule (verify relationship first)
     */
    public List<StudentScheduleResponse> getChildSchedule(Long parentId, Long childId) {
        verifyParentChildRelationship(parentId, childId);
        return studentDataService.getSchedule(childId);
    }

    /**
     * Get child's homework
     */
    public List<StudentHomeworkResponse> getChildHomework(Long parentId, Long childId) {
        verifyParentChildRelationship(parentId, childId);
        return studentDataService.getHomework(childId);
    }

    /**
     * Get child's exams
     */
    public List<StudentExamResponse> getChildExams(Long parentId, Long childId) {
        verifyParentChildRelationship(parentId, childId);
        return studentDataService.getExams(childId);
    }

    /**
     * Get child's attendance
     */
    public List<StudentAttendanceResponse> getChildAttendance(Long parentId, Long childId) {
        verifyParentChildRelationship(parentId, childId);
        return studentDataService.getAttendance(childId);
    }

    /**
     * Get child's attendance summary
     */
    public AttendanceSummary getChildAttendanceSummary(Long parentId, Long childId) {
        verifyParentChildRelationship(parentId, childId);
        return studentDataService.getAttendanceSummary(childId);
    }

    /**
     * Verify that the child belongs to this parent
     */
    private void verifyParentChildRelationship(Long parentId, Long childId) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        
        boolean isChild = parent.getChildren().stream()
                .anyMatch(s -> s.getId().equals(childId));
        
        if (!isChild) {
            throw new RuntimeException("Access denied: Child not linked to this parent");
        }
    }

    private ChildResponse mapToChildResponse(Student student) {
        AttendanceSummary attendanceSummary = studentDataService.getAttendanceSummary(student.getId());
        
        return ChildResponse.builder()
                .id(student.getId())
                .fullName(student.getUser() != null ? student.getUser().getFullName() : null)
                .gradeName(student.getGrade() != null ? student.getGrade().getName() : null)
                .attendanceRate(attendanceSummary.getAttendanceRate())
                .build();
    }
}
