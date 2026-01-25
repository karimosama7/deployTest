package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentExamSolutionResponse {
    private Long executionId;
    private String examTitle;
    private String studentName;
    private BigDecimal score;
    private Integer totalMarks;
    private List<QuestionSolution> questions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionSolution {
        private Long id;
        private String text;
        private String imageUrl;
        private Integer marks;
        private String questionType;
        private Long selectedOptionId;
        private List<OptionSolution> options;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OptionSolution {
        private Long id;
        private String text;
        private String imageUrl;
        @com.fasterxml.jackson.annotation.JsonProperty("isCorrect")
        private boolean isCorrect;
    }
}
