package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamRequest {
    
    @NotNull(message = "Class session ID is required")
    private Long classSessionId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String formUrl; // Google Form link
    
    @NotNull(message = "Exam date is required")
    private LocalDate examDate;
}
