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
public class StudentAttendanceResponse {
    private Long classId;
    private String classTitle;
    private String subjectName;
    private LocalDateTime scheduledTime;
    private Boolean attended;
    private LocalDateTime markedAt;
}
