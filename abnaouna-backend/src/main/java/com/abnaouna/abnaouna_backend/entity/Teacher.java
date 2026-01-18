package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ManyToMany
    @JoinTable(
        name = "teacher_subjects",
        joinColumns = @JoinColumn(name = "teacher_id"),
        inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    @Builder.Default
    private Set<Subject> subjects = new HashSet<>(); // Max 2 subjects (enforce in service)

    @ManyToMany
    @JoinTable(
        name = "teacher_grades",
        joinColumns = @JoinColumn(name = "teacher_id"),
        inverseJoinColumns = @JoinColumn(name = "grade_id")
    )
    @Builder.Default
    private Set<Grade> grades = new HashSet<>(); // Assigned grades
}

