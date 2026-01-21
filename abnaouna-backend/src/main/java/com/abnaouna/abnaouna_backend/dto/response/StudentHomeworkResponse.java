package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentHomeworkResponse {
    private Long id;
    private String title;
    private String description;
    private String subjectName;
    private LocalDateTime dueDate;
    private String homeworkUrl;
    private Boolean isSubmitted;
    private String submissionStatus;
    private BigDecimal grade;
    private String feedback;
}
