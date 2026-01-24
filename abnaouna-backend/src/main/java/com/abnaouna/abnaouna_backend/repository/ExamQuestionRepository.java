package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, Long> {
    List<ExamQuestion> findByExamIdOrderBySortOrderAsc(Long examId);
}
