package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamExecutionResponse {
    private Long executionId;
    private Long examId;
    private String title;
    private Integer durationMinutes;
    private Integer totalMarks;
    private LocalDateTime startedAt;
    private LocalDateTime endDate; // Exam expiry
    private List<QuestionResponse> questions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionResponse {
        private Long id;
        private String text;
        private String imageUrl;
        private Integer marks;
        private String questionType;
        private Integer sortOrder;
        private List<OptionResponse> options;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OptionResponse {
        private Long id;
        private String text;
        private String imageUrl;
        // No isCorrect here!
    }
}
