package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.Student;
import com.abnaouna.abnaouna_backend.entity.Grade;
import com.abnaouna.abnaouna_backend.entity.Parent;
import com.abnaouna.abnaouna_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByUser(User user);
    
    Optional<Student> findByUserId(Long userId);
    
    List<Student> findByGrade(Grade grade);
    
    List<Student> findByGradeId(Long gradeId);
    
    List<Student> findByParent(Parent parent);
    
    List<Student> findByParentId(Long parentId);
    
    long countByGradeId(Long gradeId);
}
