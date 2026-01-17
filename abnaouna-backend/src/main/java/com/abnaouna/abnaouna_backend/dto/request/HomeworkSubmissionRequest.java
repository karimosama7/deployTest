package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomeworkSubmissionRequest {
    
    @NotNull(message = "Homework ID is required")
    private Long homeworkId;
    
    @NotBlank(message = "Solution URL is required")
    private String solutionUrl; // Student's Google Drive link
}
