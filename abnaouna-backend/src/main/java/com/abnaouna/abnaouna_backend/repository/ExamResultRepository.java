package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.ExamResult;
import com.abnaouna.abnaouna_backend.entity.Exam;
import com.abnaouna.abnaouna_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    List<ExamResult> findByExam(Exam exam);

    List<ExamResult> findByExamId(Long examId);

    List<ExamResult> findByStudent(Student student);

    List<ExamResult> findByStudentId(Long studentId);

    Optional<ExamResult> findByExamIdAndStudentId(Long examId, Long studentId);

    List<ExamResult> findByStatus(ExamResult.ExamStatus status);

    @org.springframework.data.jpa.repository.Query("SELECT COUNT(DISTINCT r.exam.id) FROM ExamResult r WHERE r.exam.teacher.id = :teacherId AND r.submittedAt IS NOT NULL AND r.grade IS NULL")
    long countPendingGradingByTeacherId(Long teacherId);
}
