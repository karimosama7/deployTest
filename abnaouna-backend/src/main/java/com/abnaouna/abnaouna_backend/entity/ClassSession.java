package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "scheduled_time", nullable = false)
    private LocalDateTime scheduledTime;

    @Column(name = "teams_meeting_url", length = 500)
    private String teamsMeetingUrl;

    @Column(name = "teams_recording_url", length = 500)
    private String teamsRecordingUrl;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ClassStatus status = ClassStatus.SCHEDULED;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Cascade delete relationships
    @ManyToMany(mappedBy = "classSessions")
    @Builder.Default
    private List<Exam> exams = new ArrayList<>();

    @OneToMany(mappedBy = "classSession", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Homework> homeworkList = new ArrayList<>();

    @OneToMany(mappedBy = "classSession", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Attendance> attendanceRecords = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum ClassStatus {
        SCHEDULED, LIVE, COMPLETED
    }
}
