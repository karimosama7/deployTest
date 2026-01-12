package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grades")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name; // 'Grade 1', 'Grade 2', etc.

    @Column(nullable = false)
    private Integer level; // 1, 2, 3, 4, 5, 6
}
