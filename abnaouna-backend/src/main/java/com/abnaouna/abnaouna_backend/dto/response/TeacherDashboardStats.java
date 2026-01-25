package com.abnaouna.abnaouna_backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeacherDashboardStats {
    private long totalStudents;
    private long totalClasses;
    private long activeHomework;
    private long pendingGrading;
}
