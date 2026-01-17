package com.abnaouna.abnaouna_backend.dto.response;

import com.abnaouna.abnaouna_backend.entity.ClassSession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassSessionResponse {
    
    private Long id;
    private String title;
    private String description;
    private LocalDateTime scheduledTime;
    private String teamsMeetingUrl;
    private String teamsRecordingUrl;
    private ClassSession.ClassStatus status;
    private LocalDateTime createdAt;
    
    // Related entities info
    private Long gradeId;
    private String gradeName;
    private Long subjectId;
    private String subjectName;
    private Long teacherId;
    private String teacherName;
}
