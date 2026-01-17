package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.response.AttendanceResponse;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final ClassSessionRepository classSessionRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public List<AttendanceResponse> markAttendance(Long classId, Map<Long, Boolean> studentAttendance) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        List<Attendance> attendanceList = new ArrayList<>();
        
        for (Map.Entry<Long, Boolean> entry : studentAttendance.entrySet()) {
            Long studentId = entry.getKey();
            Boolean attended = entry.getValue();
            
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));
            
            // Check if attendance already exists for this class and student
            Attendance attendance = attendanceRepository
                    .findByClassSessionIdAndStudentId(classId, studentId)
                    .orElse(Attendance.builder()
                            .classSession(classSession)
                            .student(student)
                            .build());
            
            attendance.setAttended(attended);
            attendance.setMarkedAt(LocalDateTime.now());
            attendanceList.add(attendanceRepository.save(attendance));
        }
        
        return attendanceList.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> getClassAttendance(Long classId) {
        return attendanceRepository.findByClassSessionId(classId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> getStudentAttendance(Long studentId) {
        return attendanceRepository.findByStudentId(studentId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get students enrolled in a grade for attendance marking
    public List<Student> getEnrolledStudents(Long classId) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        return studentRepository.findByGradeId(classSession.getGrade().getId());
    }

    private AttendanceResponse mapToResponse(Attendance attendance) {
        return AttendanceResponse.builder()
                .id(attendance.getId())
                .studentId(attendance.getStudent().getId())
                .studentName(attendance.getStudent().getUser().getFullName())
                .attended(attendance.getAttended())
                .markedAt(attendance.getMarkedAt())
                .build();
    }
}
