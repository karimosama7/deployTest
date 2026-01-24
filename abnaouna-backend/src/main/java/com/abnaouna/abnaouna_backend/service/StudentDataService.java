package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.response.*;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentDataService {

        private final StudentRepository studentRepository;
        private final ClassSessionRepository classSessionRepository;
        private final HomeworkRepository homeworkRepository;
        private final HomeworkSubmissionRepository submissionRepository;
        private final ExamRepository examRepository;
        private final ExamResultRepository examResultRepository;
        private final AttendanceRepository attendanceRepository;

        /**
         * Get student's class schedule (classes for their grade)
         */
        public List<StudentScheduleResponse> getSchedule(Long studentId) {
                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException("Student not found"));

                if (student.getGrade() == null) {
                        return new ArrayList<>();
                }

                List<ClassSession> classes = classSessionRepository
                                .findByGradeIdOrderByScheduledTimeDesc(student.getGrade().getId());

                return classes.stream()
                                .map(cls -> StudentScheduleResponse.builder()
                                                .id(cls.getId())
                                                .title(cls.getTitle())
                                                .subjectName(cls.getSubject() != null ? cls.getSubject().getNameAr()
                                                                : null)
                                                .teacherName(cls.getTeacher() != null
                                                                && cls.getTeacher().getUser() != null
                                                                                ? cls.getTeacher().getUser()
                                                                                                .getFullName()
                                                                                : null)
                                                .scheduledTime(cls.getScheduledTime())
                                                .status(cls.getStatus().name())
                                                .teamsMeetingUrl(cls.getTeamsMeetingUrl())
                                                .teamsRecordingUrl(cls.getTeamsRecordingUrl())
                                                .build())
                                .collect(Collectors.toList());
        }

        /**
         * Get student's homework with submission status
         */
        public List<StudentHomeworkResponse> getHomework(Long studentId) {
                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException("Student not found"));

                if (student.getGrade() == null) {
                        return new ArrayList<>();
                }

                // Get all classes for the student's grade
                List<ClassSession> classes = classSessionRepository
                                .findByGradeIdOrderByScheduledTimeDesc(student.getGrade().getId());
                List<StudentHomeworkResponse> result = new ArrayList<>();

                for (ClassSession cls : classes) {
                        List<Homework> homeworkList = homeworkRepository.findByClassSessionId(cls.getId());

                        for (Homework hw : homeworkList) {
                                Optional<HomeworkSubmission> submission = submissionRepository
                                                .findByHomeworkIdAndStudentId(hw.getId(), studentId);

                                StudentHomeworkResponse response = StudentHomeworkResponse.builder()
                                                .id(hw.getId())
                                                .title(hw.getTitle())
                                                .description(hw.getDescription())
                                                .subjectName(cls.getSubject() != null ? cls.getSubject().getNameAr()
                                                                : null)
                                                .dueDate(hw.getDueDate())
                                                .homeworkUrl(hw.getHomeworkUrl())
                                                .isSubmitted(submission.isPresent())
                                                .submissionStatus(submission.map(s -> s.getStatus().name())
                                                                .orElse("NOT_SUBMITTED"))
                                                .grade(submission.map(HomeworkSubmission::getGrade).orElse(null))
                                                .feedback(submission.map(HomeworkSubmission::getFeedback).orElse(null))
                                                .build();

                                result.add(response);
                        }
                }

                // Sort by Due Date Descending (Newest first)
                result.sort((a, b) -> b.getDueDate().compareTo(a.getDueDate()));
                return result;
        }

        /**
         * Get student's exams with grades
         */
        public List<StudentExamResponse> getExams(Long studentId) {
                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException("Student not found"));

                if (student.getGrade() == null) {
                        return new ArrayList<>();
                }

                List<ClassSession> classes = classSessionRepository
                                .findByGradeIdOrderByScheduledTimeDesc(student.getGrade().getId());
                List<StudentExamResponse> result = new ArrayList<>();

                for (ClassSession cls : classes) {
                        List<Exam> exams = examRepository.findByClassSessions_Id(cls.getId());

                        for (Exam exam : exams) {
                                Optional<ExamResult> examResult = examResultRepository
                                                .findByExamIdAndStudentId(exam.getId(), studentId);

                                boolean isUpcoming = exam.getExamDate().isAfter(LocalDateTime.now());

                                StudentExamResponse response = StudentExamResponse.builder()
                                                .id(exam.getId())
                                                .title(exam.getTitle())
                                                .subjectName(cls.getSubject() != null ? cls.getSubject().getNameAr()
                                                                : null)
                                                .examDate(exam.getExamDate())
                                                .formUrl(exam.getFormUrl())
                                                .status(isUpcoming ? "UPCOMING"
                                                                : examResult.map(r -> r.getStatus().name())
                                                                                .orElse("PENDING"))
                                                .grade(examResult.map(ExamResult::getGrade).orElse(null))
                                                .build();

                                result.add(response);
                        }
                }

                // Sort by Exam Date Descending
                result.sort((a, b) -> b.getExamDate().compareTo(a.getExamDate()));
                return result;
        }

        /**
         * Get student's attendance records
         */
        public List<StudentAttendanceResponse> getAttendance(Long studentId) {
                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new RuntimeException("Student not found"));

                List<Attendance> attendanceList = attendanceRepository.findByStudentId(studentId);

                return attendanceList.stream()
                                .map(att -> {
                                        ClassSession cls = att.getClassSession();
                                        return StudentAttendanceResponse.builder()
                                                        .classId(cls.getId())
                                                        .classTitle(cls.getTitle())
                                                        .subjectName(cls.getSubject() != null
                                                                        ? cls.getSubject().getNameAr()
                                                                        : null)
                                                        .scheduledTime(cls.getScheduledTime())
                                                        .attended(att.getAttended())
                                                        .markedAt(att.getMarkedAt())
                                                        .build();
                                })
                                .collect(Collectors.toList());
        }

        /**
         * Get attendance summary (for dashboard)
         */
        public AttendanceSummary getAttendanceSummary(Long studentId) {
                long total = attendanceRepository.countByStudentId(studentId);
                long attended = attendanceRepository.countByStudentIdAndAttendedTrue(studentId);

                return AttendanceSummary.builder()
                                .totalClasses(total)
                                .attendedClasses(attended)
                                .attendanceRate(total > 0 ? (double) attended / total * 100 : 0)
                                .build();
        }
}
