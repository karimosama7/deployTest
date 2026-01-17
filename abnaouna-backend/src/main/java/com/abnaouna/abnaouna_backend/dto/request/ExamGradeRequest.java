package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamGradeRequest {
    
    @NotNull(message = "Student grades map is required")
    private Map<Long, BigDecimal> studentGrades; // studentId -> grade
}
