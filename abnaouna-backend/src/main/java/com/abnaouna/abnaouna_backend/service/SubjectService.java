package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.entity.Subject;
import com.abnaouna.abnaouna_backend.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    public Subject getSubjectByName(String name) {
        return subjectRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Subject not found: " + name));
    }

    @Transactional
    public Subject createSubject(String name, String nameAr) {
        if (subjectRepository.findByName(name).isPresent()) {
            throw new RuntimeException("Subject with name '" + name + "' already exists");
        }
        Subject subject = Subject.builder()
                .name(name)
                .nameAr(nameAr)
                .build();
        return subjectRepository.save(subject);
    }

    @Transactional
    public Subject updateSubject(Long id, String name, String nameAr) {
        Subject subject = getSubjectById(id);
        subject.setName(name);
        subject.setNameAr(nameAr);
        return subjectRepository.save(subject);
    }

    @Transactional
    public void deleteSubject(Long id) {
        Subject subject = getSubjectById(id);
        subjectRepository.delete(subject);
    }
}
