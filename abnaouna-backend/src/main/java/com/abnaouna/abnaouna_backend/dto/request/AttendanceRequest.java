package com.abnaouna.abnaouna_backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {
    
    @NotNull(message = "Student attendance map is required")
    private Map<Long, Boolean> studentAttendance; // studentId -> attended
}
