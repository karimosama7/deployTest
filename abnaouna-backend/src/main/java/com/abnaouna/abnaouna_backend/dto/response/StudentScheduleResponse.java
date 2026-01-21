package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentScheduleResponse {
    private Long id;
    private String title;
    private String subjectName;
    private String teacherName;
    private LocalDateTime scheduledTime;
    private String status;
    private String teamsMeetingUrl;
    private String teamsRecordingUrl;
    private Long studentId;
    private String studentName;
}
