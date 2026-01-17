package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomeworkRequest {
    
    @NotNull(message = "Class session ID is required")
    private Long classSessionId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    private String homeworkUrl; // Google Drive link
    
    @NotNull(message = "Due date is required")
    private LocalDateTime dueDate;
}
