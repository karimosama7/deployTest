package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.HomeworkSubmission;
import com.abnaouna.abnaouna_backend.entity.Homework;
import com.abnaouna.abnaouna_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface HomeworkSubmissionRepository extends JpaRepository<HomeworkSubmission, Long> {
    
    List<HomeworkSubmission> findByHomework(Homework homework);
    
    List<HomeworkSubmission> findByHomeworkId(Long homeworkId);
    
    List<HomeworkSubmission> findByStudent(Student student);
    
    List<HomeworkSubmission> findByStudentId(Long studentId);
    
    Optional<HomeworkSubmission> findByHomeworkIdAndStudentId(Long homeworkId, Long studentId);
    
    List<HomeworkSubmission> findByStatus(HomeworkSubmission.SubmissionStatus status);
}
