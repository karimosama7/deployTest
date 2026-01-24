package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exam_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    @ToString.Exclude // Prevent circular reference in lombok toString
    private Exam exam;

    @Column(nullable = false, length = 1000)
    private String text;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false)
    private Integer marks;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ExamOption> options = new ArrayList<>();

    public enum QuestionType {
        MCQ, TRUE_FALSE
    }
}
