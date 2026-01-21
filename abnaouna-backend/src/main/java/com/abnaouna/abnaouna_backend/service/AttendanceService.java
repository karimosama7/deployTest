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
        private final NotificationService notificationService;

        @Transactional
        public void recordAttendance(Long classId, Long studentId) {
                ClassSession classSession = classSessionRepository.findById(classId)
                                .orElseThrow(() -> new RuntimeException("Class not found"));

                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException("Student not found"));

                // Check if attendance already exists
                Attendance attendance = attendanceRepository
                                .findByClassSessionIdAndStudentId(classId, studentId)
                                .orElse(Attendance.builder()
                                                .classSession(classSession)
                                                .student(student)
                                                .attended(false)
                                                .build());

                if (!attendance.getAttended()) {
                        attendance.setAttended(true);
                        attendance.setMarkedAt(LocalDateTime.now());
                        attendanceRepository.save(attendance);

                        // Notify Parent
                        if (student.getParent() != null) {
                                notificationService.createNotification(
                                                student.getParent(),
                                                student,
                                                "تم تسجيل الحضور",
                                                String.format("الطالب %s حضر الحصة: %s",
                                                                student.getUser().getFullName(),
                                                                classSession.getTitle()),
                                                Notification.NotificationType.ATTENDANCE);
                        }
                }
        }

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

                        boolean wasAttended = attendance.getAttended();
                        attendance.setAttended(attended);
                        attendance.setMarkedAt(LocalDateTime.now());
                        attendance = attendanceRepository.save(attendance);
                        attendanceList.add(attendance);

                        // Notify Parent if marked as attended (and wasn't before)
                        // Note: This might be spammy if teacher updates in bulk, consider logic
                        // adaptation
                        // For now, only notify if changing from false to true
                        if (attended && !wasAttended && student.getParent() != null) {
                                notificationService.createNotification(
                                                student.getParent(),
                                                student,
                                                "تم تسجيل الحضور",
                                                String.format("قام المعلم بتسجيل حضور الطالب %s للحصة: %s",
                                                                student.getUser().getFullName(),
                                                                classSession.getTitle()),
                                                Notification.NotificationType.ATTENDANCE);
                        }
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
