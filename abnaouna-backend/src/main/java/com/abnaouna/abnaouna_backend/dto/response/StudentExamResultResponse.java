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
public class StudentExamResultResponse {
    private Long executionId;
    private Long examId;
    private String title;
    private BigDecimal score;
    private Integer totalMarks;
    private LocalDateTime submittedAt;
    private String status;
    private String feedback; // "Excellent", "Good", etc.
}
