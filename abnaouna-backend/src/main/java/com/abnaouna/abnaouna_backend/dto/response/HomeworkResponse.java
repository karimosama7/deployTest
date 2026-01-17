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
public class HomeworkResponse {
    
    private Long id;
    private String title;
    private String description;
    private String homeworkUrl;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    
    // Related info
    private Long classSessionId;
    private String classTitle;
    private String subjectName;
    
    // Stats
    private Integer totalSubmissions;
    private Integer gradedSubmissions;
}
