package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.Attendance;
import com.abnaouna.abnaouna_backend.entity.ClassSession;
import com.abnaouna.abnaouna_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    List<Attendance> findByClassSession(ClassSession classSession);
    
    List<Attendance> findByClassSessionId(Long classSessionId);
    
    List<Attendance> findByStudent(Student student);
    
    List<Attendance> findByStudentId(Long studentId);
    
    Optional<Attendance> findByClassSessionIdAndStudentId(Long classSessionId, Long studentId);
    
    long countByStudentIdAndAttendedTrue(Long studentId);
    
    long countByStudentId(Long studentId);
}
