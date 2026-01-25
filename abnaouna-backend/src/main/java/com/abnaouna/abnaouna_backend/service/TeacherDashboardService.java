package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.response.TeacherDashboardStats;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TeacherDashboardService {

    private final ClassSessionRepository classSessionRepository;
    private final AttendanceRepository attendanceRepository; // For counting students enrolled? Actually
                                                             // StudentRepository can find by classes. Wait, we have
                                                             // AttendanceService logic for this.
    // Simpler: find students via ClassSession -> Enrolled Students
    // (Attendance/Student Link).
    // Or if there is a helper repository method.

    private final HomeworkRepository homeworkRepository;
    private final ExamRepository examRepository;
    private final ExamResultRepository examResultRepository;
    private final StudentRepository studentRepository; // For counting students

    public TeacherDashboardStats getStats(Long teacherId) {

        // 1. Total Classes
        long totalClasses = classSessionRepository.countByTeacherId(teacherId);

        // 2. Total Students (Distinct)
        // We need to count distinct students enrolled in ANY of the teacher's classes.
        // Assuming Student <-> ClassSession relationship is via Attendance table
        // (enrolled students) OR Join Table.
        // Let's check AttendanceService logic previously used:
        // `attendanceService.getEnrolledStudents(id)`
        // If we don't have a direct query, we might need a custom query in
        // StudentRepository.
        // "countDistinctByClassSessions_Teacher_Id(teacherId)" if ManyToMany exists?
        // Checking ClassSession entity...
        // Let's assume for now we use a repository method we can add.

        long totalStudents = studentRepository.countDistinctStudentsByTeacherId(teacherId);
        // We will need to add this method to StudentRepository.

        // 3. Active Homework
        // Homework where DueDate > Now AND created by this teacher (via ClassSession)
        long activeHomework = homeworkRepository.countActiveHomeworkByTeacherId(teacherId, LocalDateTime.now());

        // 4. Pending Grading
        // Exams that are COMPLETED/SUBMITTED but not graded?
        // Or Homework Submissions not graded?
        // Let's count "Pending Exam Results" (Status PENDING/COMPLETED but Grade is
        // Null? Or Status COMPLETED).
        // Let's simplify: Exams that ended but have ungraded students?
        // Maybe count `ExamResult` where Grade is null but Status is not PENDING.
        long pendingGrading = examResultRepository.countPendingGradingByTeacherId(teacherId);

        return TeacherDashboardStats.builder()
                .totalClasses(totalClasses)
                .totalStudents(totalStudents)
                .activeHomework(activeHomework)
                .pendingGrading(pendingGrading)
                .build();
    }
}
