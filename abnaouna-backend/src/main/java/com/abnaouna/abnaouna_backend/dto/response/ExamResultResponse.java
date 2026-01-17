package com.abnaouna.abnaouna_backend.dto.response;

import com.abnaouna.abnaouna_backend.entity.ExamResult;
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
public class ExamResultResponse {
    
    private Long id;
    private Long examId;
    private String examTitle;
    private Long studentId;
    private String studentName;
    private BigDecimal grade;
    private ExamResult.ExamStatus status;
    private LocalDateTime submittedAt;
    private LocalDateTime gradedAt;
}
