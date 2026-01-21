package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "class_id") // Made nullable
    private ClassSession classSession;

    @ManyToOne
    @JoinColumn(name = "teacher_id") // Add owner
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @Column(nullable = false)
    private String title;

    @Column(name = "form_url", length = 500)
    private String formUrl; // Google Form link

    @Column(name = "exam_date", nullable = false)
    private LocalDateTime examDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Cascade delete for exam results
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ExamResult> results = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
