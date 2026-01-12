package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.Homework;
import com.abnaouna.abnaouna_backend.entity.ClassSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {
    
    List<Homework> findByClassSession(ClassSession classSession);
    
    List<Homework> findByClassSessionId(Long classSessionId);
    
    List<Homework> findByDueDateBefore(LocalDateTime dateTime);
    
    List<Homework> findByDueDateAfter(LocalDateTime dateTime);
}
