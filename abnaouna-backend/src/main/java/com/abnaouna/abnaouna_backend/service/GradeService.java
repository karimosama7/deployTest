package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.entity.Grade;
import com.abnaouna.abnaouna_backend.repository.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GradeService {

    private final GradeRepository gradeRepository;

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(Long id) {
        return gradeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grade not found"));
    }

    public Grade getGradeByLevel(Integer level) {
        return gradeRepository.findByLevel(level)
                .orElseThrow(() -> new RuntimeException("Grade not found for level: " + level));
    }

    @Transactional
    public Grade createGrade(String name, Integer level) {
        if (gradeRepository.findByLevel(level).isPresent()) {
            throw new RuntimeException("Grade with level " + level + " already exists");
        }
        Grade grade = Grade.builder()
                .name(name)
                .level(level)
                .build();
        return gradeRepository.save(grade);
    }

    @Transactional
    public Grade updateGrade(Long id, String name, Integer level) {
        Grade grade = getGradeById(id);
        grade.setName(name);
        grade.setLevel(level);
        return gradeRepository.save(grade);
    }

    @Transactional
    public void deleteGrade(Long id) {
        Grade grade = getGradeById(id);
        gradeRepository.delete(grade);
    }
}
