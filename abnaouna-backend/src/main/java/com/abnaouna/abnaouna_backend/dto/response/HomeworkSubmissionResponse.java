package com.abnaouna.abnaouna_backend.dto.response;

import com.abnaouna.abnaouna_backend.entity.HomeworkSubmission;
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
public class HomeworkSubmissionResponse {
    
    private Long id;
    private Long homeworkId;
    private String homeworkTitle;
    private Long studentId;
    private String studentName;
    private String solutionUrl;
    private LocalDateTime submittedAt;
    private HomeworkSubmission.SubmissionStatus status;
    private Boolean isCompleted;
    private BigDecimal grade;
    private String feedback;
}
