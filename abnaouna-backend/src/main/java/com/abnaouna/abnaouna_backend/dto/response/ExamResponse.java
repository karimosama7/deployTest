package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private Long classSessionId;
    private String classTitle;
    private String subjectName;

    // Stats
    private Integer totalStudents;
    private Integer gradedStudents;
    private Double averageGrade;
}
