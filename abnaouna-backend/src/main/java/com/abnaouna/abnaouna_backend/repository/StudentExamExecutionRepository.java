package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.StudentExamExecution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StudentExamExecutionRepository extends JpaRepository<StudentExamExecution, Long> {
    Optional<StudentExamExecution> findByExamIdAndStudentId(Long examId, Long studentId);
}
