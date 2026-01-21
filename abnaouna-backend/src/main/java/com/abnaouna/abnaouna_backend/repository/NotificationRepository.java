package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Long parentId);

    long countByRecipientIdAndIsReadFalse(Long parentId);
}
