package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

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
}
