package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exam_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    @ToString.Exclude
    private ExamQuestion question;

    @Column(nullable = false)
    private String text;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect;
}
