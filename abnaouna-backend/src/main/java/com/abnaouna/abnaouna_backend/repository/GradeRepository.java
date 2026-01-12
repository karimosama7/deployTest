package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    
    Optional<Grade> findByLevel(Integer level);
    
    Optional<Grade> findByName(String name);
}
