package com.abnaouna.abnaouna_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name; // 'Math', 'Arabic', 'Science', etc.

    @Column(name = "name_ar", length = 100)
    private String nameAr; // Arabic name
}
