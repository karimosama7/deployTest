package com.abnaouna.abnaouna_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentReportResponse {
    private Long studentId;
    private String fullName;
    private String gradeName;
    private String parentName;
    // Can be extended with attendance stats, homework completion rate, exam averages, etc.
}
