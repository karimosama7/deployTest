package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.request.ClassSessionRequest;
import com.abnaouna.abnaouna_backend.dto.response.ClassSessionResponse;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassSessionService {

    private final ClassSessionRepository classSessionRepository;
    private final TeacherRepository teacherRepository;
    private final GradeRepository gradeRepository;
    private final SubjectRepository subjectRepository;

    public List<ClassSessionResponse> getTeacherClasses(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        return classSessionRepository.findByTeacher(teacher).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ClassSessionResponse getClassById(Long classId) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        return mapToResponse(classSession);
    }

    @Transactional
    public ClassSessionResponse createClass(Long teacherId, ClassSessionRequest request) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        Grade grade = gradeRepository.findById(request.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));
        
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        
        ClassSession classSession = ClassSession.builder()
                .teacher(teacher)
                .grade(grade)
                .subject(subject)
                .title(request.getTitle())
                .description(request.getDescription())
                .scheduledTime(request.getScheduledTime())
                .teamsMeetingUrl(request.getTeamsMeetingUrl())
                .status(ClassSession.ClassStatus.SCHEDULED)
                .build();
        
        classSession = classSessionRepository.save(classSession);
        return mapToResponse(classSession);
    }

    @Transactional
    public ClassSessionResponse updateClass(Long classId, ClassSessionRequest request) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        Grade grade = gradeRepository.findById(request.getGradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));
        
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        
        classSession.setGrade(grade);
        classSession.setSubject(subject);
        classSession.setTitle(request.getTitle());
        classSession.setDescription(request.getDescription());
        classSession.setScheduledTime(request.getScheduledTime());
        classSession.setTeamsMeetingUrl(request.getTeamsMeetingUrl());
        
        classSession = classSessionRepository.save(classSession);
        return mapToResponse(classSession);
    }

    @Transactional
    public ClassSessionResponse updateMeetingUrl(Long classId, String meetingUrl) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        classSession.setTeamsMeetingUrl(meetingUrl);
        classSession = classSessionRepository.save(classSession);
        return mapToResponse(classSession);
    }

    @Transactional
    public ClassSessionResponse updateRecordingUrl(Long classId, String recordingUrl) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        classSession.setTeamsRecordingUrl(recordingUrl);
        classSession.setStatus(ClassSession.ClassStatus.COMPLETED);
        classSession = classSessionRepository.save(classSession);
        return mapToResponse(classSession);
    }

    @Transactional
    public ClassSessionResponse updateStatus(Long classId, ClassSession.ClassStatus status) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        
        classSession.setStatus(status);
        classSession = classSessionRepository.save(classSession);
        return mapToResponse(classSession);
    }

    @Transactional
    public void deleteClass(Long classId) {
        ClassSession classSession = classSessionRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));
        classSessionRepository.delete(classSession);
    }

    // Helper method to verify teacher owns the class
    public boolean isTeacherOwner(Long classId, Long teacherId) {
        ClassSession classSession = classSessionRepository.findById(classId).orElse(null);
        return classSession != null && classSession.getTeacher().getId().equals(teacherId);
    }

    private ClassSessionResponse mapToResponse(ClassSession classSession) {
        return ClassSessionResponse.builder()
                .id(classSession.getId())
                .title(classSession.getTitle())
                .description(classSession.getDescription())
                .scheduledTime(classSession.getScheduledTime())
                .teamsMeetingUrl(classSession.getTeamsMeetingUrl())
                .teamsRecordingUrl(classSession.getTeamsRecordingUrl())
                .status(classSession.getStatus())
                .createdAt(classSession.getCreatedAt())
                .gradeId(classSession.getGrade().getId())
                .gradeName(classSession.getGrade().getName())
                .subjectId(classSession.getSubject().getId())
                .subjectName(classSession.getSubject().getName())
                .teacherId(classSession.getTeacher().getId())
                .teacherName(classSession.getTeacher().getUser().getFullName())
                .build();
    }
}
