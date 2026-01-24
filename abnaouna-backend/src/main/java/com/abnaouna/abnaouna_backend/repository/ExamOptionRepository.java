package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.ExamOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamOptionRepository extends JpaRepository<ExamOption, Long> {
    List<ExamOption> findByQuestionId(Long questionId);
}
