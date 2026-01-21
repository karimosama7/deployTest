package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.response.NotificationResponse;
import com.abnaouna.abnaouna_backend.entity.Notification;
import com.abnaouna.abnaouna_backend.entity.Parent;
import com.abnaouna.abnaouna_backend.entity.Student;
import com.abnaouna.abnaouna_backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Transactional
    public void createNotification(Parent recipient, Student student, String title, String message,
            Notification.NotificationType type) {
        if (recipient == null)
            return;

        Notification notification = Notification.builder()
                .recipient(recipient)
                .student(student)
                .title(title)
                .message(message)
                .type(type)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public List<NotificationResponse> getParentNotifications(Long parentId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(parentId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public long getUnreadCount(Long parentId) {
        return notificationRepository.countByRecipientIdAndIsReadFalse(parentId);
    }

    @Transactional
    public NotificationResponse markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setIsRead(true);
        return mapToResponse(notificationRepository.save(notification));
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .studentId(notification.getStudent() != null ? notification.getStudent().getId() : null)
                .studentName(
                        notification.getStudent() != null ? notification.getStudent().getUser().getFullName() : null)
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
