package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_exam_executions", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "exam_id", "student_id" })
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentExamExecution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(precision = 5, scale = 2)
    private BigDecimal score;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ExecutionStatus status = ExecutionStatus.IN_PROGRESS;

    @Column(columnDefinition = "TEXT")
    private String answersJson; // Store answers as JSON string: {"qId": optId, ...}

    public enum ExecutionStatus {
        IN_PROGRESS, COMPLETED, EXPIRED
    }
}
