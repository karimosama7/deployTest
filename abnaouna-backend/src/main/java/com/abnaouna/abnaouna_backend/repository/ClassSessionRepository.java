package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.ClassSession;
import com.abnaouna.abnaouna_backend.entity.Grade;
import com.abnaouna.abnaouna_backend.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClassSessionRepository extends JpaRepository<ClassSession, Long> {

    List<ClassSession> findByTeacher(Teacher teacher);

    List<ClassSession> findByTeacherId(Long teacherId);

    List<ClassSession> findByGrade(Grade grade);

    List<ClassSession> findByGradeId(Long gradeId);

    List<ClassSession> findByGradeIdAndSubjectId(Long gradeId, Long subjectId);

    List<ClassSession> findByScheduledTimeBetween(LocalDateTime start, LocalDateTime end);

    List<ClassSession> findByStatus(ClassSession.ClassStatus status);

    // Sorted queries (newest first)
    List<ClassSession> findByTeacherIdOrderByScheduledTimeDesc(Long teacherId);

    List<ClassSession> findByGradeIdOrderByScheduledTimeDesc(Long gradeId);

    long countByTeacherId(Long teacherId);
}
