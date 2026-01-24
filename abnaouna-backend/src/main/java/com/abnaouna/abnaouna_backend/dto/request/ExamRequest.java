package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamRequest {

    @NotNull(message = "Grade ID is required")
    private Long gradeId;

    @NotNull(message = "Subject ID is required")
    private Long subjectId;

    @NotBlank(message = "Title is required")
    private String title;

    private String formUrl; // Google Form link

    @NotNull(message = "Exam date is required")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime examDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;

    private Integer durationMinutes;
    private Integer totalMarks;
    private Integer passingScore;
    private String resultConfiguration; // Enum string
    private boolean published;

    private List<Long> classSessionIds;

    private List<QuestionRequest> questions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionRequest {
        @NotBlank(message = "Question text is required")
        private String text;
        private String imageUrl;
        private Integer marks;
        private String questionType; // MCQ
        private Integer sortOrder;
        private List<OptionRequest> options;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OptionRequest {
        @NotBlank(message = "Option text is required")
        private String text;
        private String imageUrl;
        private boolean isCorrect;
    }
}
