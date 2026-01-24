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
public class ExamResponse {

    private Long id;
    private String title;
    private String formUrl;
    private LocalDateTime examDate;
    private LocalDateTime createdAt;

    // Related info
    // Related info
    private Long classSessionId; // kept for legacy if needed, or null
    private String classTitle; // Comma separated for multiple
    private String subjectName;

    private Integer durationMinutes;
    private Integer totalMarks;
    private Integer passingScore;
    private String resultConfiguration;
    private LocalDateTime endDate;

    // Stats
    private Integer totalStudents;
    private Integer gradedStudents;
    private Double averageGrade;
}
