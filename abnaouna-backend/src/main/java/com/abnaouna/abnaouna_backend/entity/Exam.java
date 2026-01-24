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

    @ManyToMany
    @JoinTable(name = "exam_classes", joinColumns = @JoinColumn(name = "exam_id"), inverseJoinColumns = @JoinColumn(name = "class_id"))
    @Builder.Default
    private List<ClassSession> classSessions = new ArrayList<>();

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

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "total_marks")
    private Integer totalMarks;

    @Column(name = "passing_score")
    private Integer passingScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "result_config")
    @Builder.Default
    private ExamResultConfig resultConfiguration = ExamResultConfig.MANUAL;

    @Column(nullable = false)
    @Builder.Default
    private boolean published = false;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    // Cascade delete for exam results
    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ExamResult> results = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
