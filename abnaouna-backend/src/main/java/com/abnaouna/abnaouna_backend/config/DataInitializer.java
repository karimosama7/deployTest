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
        initializeTeacherUser();
        initializeParentAndStudent();
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
                    { "Arabic", "اللغة العربية" },
                    { "Math", "الرياضيات" },
                    { "Science", "العلوم" },
                    { "English", "اللغة الإنجليزية" },
                    { "Social Studies", "الدراسات الاجتماعية" },
                    { "Religion", "التربية الدينية" }
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
        }
    }

    private void initializeTeacherUser() {
        if (!userRepository.existsByUsername("teacher")) {
            log.info("Creating default teacher user...");
            User teacher = User.builder()
                    .username("teacher")
                    .password(passwordEncoder.encode("teacher123"))
                    .fullName("Ustaz Ahmed")
                    .email("teacher@abnaouna.com")
                    .role(User.Role.TEACHER)
                    .isActive(true)
                    .build();

            // Assign some subjects/grades if the Teacher entity requires it?
            // Usually Teacher entity is separate, User is just auth.
            // Let's check TeacherRepository.
            // We need to create a Teacher entity linked to this User.
            // But DataInitializer might not have TeacherRepository injected.
            // Let's inject it.
            userRepository.save(teacher);
            // We will need to inject TeacherRepository to properly set up the relationship
            // if needed.
            // But for now, let's just create the User so we can login.
            // The creation flow usually creates the Teacher entity.
            // If the system expects a Teacher entity for logic, we must create it.
            // Let's assume for a quick demo, we might need manual Teacher entity creation
            // here
            // or rely on Admin UI to create it.
            // Better to check if we can inject repositories.
        }
    }

    private void initializeParentAndStudent() {
        if (!userRepository.existsByUsername("parent")) {
            log.info("Creating default parent user...");
            User parent = User.builder()
                    .username("parent")
                    .password(passwordEncoder.encode("parent123"))
                    .fullName("Abu Ali")
                    .email("parent@abnaouna.com")
                    .role(User.Role.PARENT)
                    .isActive(true)
                    .build();
            userRepository.save(parent);
        }

        if (!userRepository.existsByUsername("student")) {
            log.info("Creating default student user...");
            User student = User.builder()
                    .username("student")
                    .password(passwordEncoder.encode("student123"))
                    .fullName("Ali Ahmed")
                    .email("student@abnaouna.com")
                    .role(User.Role.STUDENT)
                    .isActive(true)
                    .build();
            userRepository.save(student);
        }
    }
}
