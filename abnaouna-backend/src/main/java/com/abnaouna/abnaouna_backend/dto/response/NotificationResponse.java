package com.abnaouna.abnaouna_backend.dto.response;

import com.abnaouna.abnaouna_backend.entity.Notification;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String title;
    private String message;
    private Notification.NotificationType type;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
