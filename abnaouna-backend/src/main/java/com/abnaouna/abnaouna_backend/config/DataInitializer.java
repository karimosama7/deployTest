package com.abnaouna.abnaouna_backend.config;

import com.abnaouna.abnaouna_backend.entity.Grade;
import com.abnaouna.abnaouna_backend.entity.Subject;
import com.abnaouna.abnaouna_backend.entity.User;
import com.abnaouna.abnaouna_backend.repository.GradeRepository;
import com.abnaouna.abnaouna_backend.repository.SubjectRepository;
import com.abnaouna.abnaouna_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GradeRepository gradeRepository;
    private final SubjectRepository subjectRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initializeGrades();
        initializeSubjects();
        initializeAdminUser();
    }

    private void initializeGrades() {
        if (gradeRepository.count() == 0) {
            log.info("Initializing grades...");
            for (int i = 1; i <= 6; i++) {
                Grade grade = Grade.builder()
                        .name("Grade " + i)
                        .level(i)
                        .build();
                gradeRepository.save(grade);
            }
            log.info("Created 6 grades (Grade 1-6)");
        }
    }

    private void initializeSubjects() {
        if (subjectRepository.count() == 0) {
            log.info("Initializing subjects...");
            String[][] subjects = {
                {"Arabic", "اللغة العربية"},
                {"Math", "الرياضيات"},
                {"Science", "العلوم"},
                {"English", "اللغة الإنجليزية"},
                {"Social Studies", "الدراسات الاجتماعية"},
                {"Religion", "التربية الدينية"}
            };
            
            for (String[] subjectData : subjects) {
                Subject subject = Subject.builder()
                        .name(subjectData[0])
                        .nameAr(subjectData[1])
                        .build();
                subjectRepository.save(subject);
            }
            log.info("Created {} subjects", subjects.length);
        }
    }

    private void initializeAdminUser() {
        if (!userRepository.existsByUsername("admin")) {
            log.info("Creating default admin user...");
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("System Administrator")
                    .email("admin@abnaouna.com")
                    .role(User.Role.ADMIN)
                    .isActive(true)
                    .build();
            userRepository.save(admin);
            log.info("Default admin created - Username: admin, Password: admin123");
            log.warn("⚠️ IMPORTANT: Change the admin password in production!");
        }
    }
}
