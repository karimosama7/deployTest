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
}
