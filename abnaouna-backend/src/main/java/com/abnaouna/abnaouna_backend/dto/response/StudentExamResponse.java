package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamResponse {
    private Long id;
    private String title;
    private String subjectName;
    private LocalDate examDate;
    private String formUrl;
    private String status; // UPCOMING, PENDING, COMPLETED, LATE, FAILED
    private BigDecimal grade;
}
