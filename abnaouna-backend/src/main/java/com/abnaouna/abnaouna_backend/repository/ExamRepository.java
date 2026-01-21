package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.Exam;
import com.abnaouna.abnaouna_backend.entity.ClassSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    List<Exam> findByClassSession(ClassSession classSession);

    List<Exam> findByClassSessionId(Long classSessionId);

    // Sorted queries
    List<Exam> findByClassSessionIdOrderByExamDateDesc(Long classSessionId);

    // New query for grade-based exams
    List<Exam> findByGradeIdOrderByExamDateDesc(Long gradeId);

    List<Exam> findByTeacherIdOrderByExamDateDesc(Long teacherId);
}
