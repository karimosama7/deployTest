package com.abnaouna.abnaouna_backend.service;

import com.abnaouna.abnaouna_backend.dto.request.CreateUserRequest;
import com.abnaouna.abnaouna_backend.dto.response.UserResponse;
import com.abnaouna.abnaouna_backend.entity.*;
import com.abnaouna.abnaouna_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final ParentRepository parentRepository;
    private final GradeRepository gradeRepository;
    private final SubjectRepository subjectRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        // Generate unique username and password
        String username = generateUsername(request.getFullName());
        String rawPassword = generatePassword();
        
        // Create user entity
        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(rawPassword))
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .role(request.getRole())
                .isActive(false) // Admin activates after payment
                .build();
        
        user = userRepository.save(user);
        
        // Create role-specific entity
        switch (request.getRole()) {
            case TEACHER:
                createTeacher(user, request);
                break;
            case STUDENT:
                createStudent(user, request);
                break;
            case PARENT:
                createParent(user, request);
                break;
            case ADMIN:
                // Admin doesn't need additional entity
                break;
        }
        
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .generatedPassword(rawPassword) // Show only on creation
                .build();
    }

    private void createTeacher(User user, CreateUserRequest request) {
        Teacher teacher = Teacher.builder()
                .user(user)
                .build();
        
        if (request.getSubjectIds() != null && request.getSubjectIds().length > 0) {
            if (request.getSubjectIds().length > 2) {
                throw new RuntimeException("Teacher can have maximum 2 subjects");
            }
            Set<Subject> subjects = new HashSet<>();
            for (Long subjectId : request.getSubjectIds()) {
                Subject subject = subjectRepository.findById(subjectId)
                        .orElseThrow(() -> new RuntimeException("Subject not found: " + subjectId));
                subjects.add(subject);
            }
            teacher.setSubjects(subjects);
        }
        
        teacherRepository.save(teacher);
    }

    private void createStudent(User user, CreateUserRequest request) {
        Student student = Student.builder()
                .user(user)
                .build();
        
        if (request.getGradeId() != null) {
            Grade grade = gradeRepository.findById(request.getGradeId())
                    .orElseThrow(() -> new RuntimeException("Grade not found"));
            student.setGrade(grade);
        }
        
        if (request.getParentId() != null) {
            Parent parent = parentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
            student.setParent(parent);
        }
        
        studentRepository.save(student);
    }

    private void createParent(User user, CreateUserRequest request) {
        Parent parent = Parent.builder()
                .user(user)
                .build();
        parent = parentRepository.save(parent);
        
        if (request.getChildrenIds() != null) {
            for (Long childId : request.getChildrenIds()) {
                Student student = studentRepository.findById(childId)
                        .orElseThrow(() -> new RuntimeException("Student not found: " + childId));
                student.setParent(parent);
                studentRepository.save(student);
            }
        }
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public List<UserResponse> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role).stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse updateUser(Long id, CreateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        
        userRepository.save(user);
        
        // Update role-specific data
        if (user.getRole() == User.Role.TEACHER) {
            Teacher teacher = teacherRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Teacher profile not found"));
            
            // Update subjects
            if (request.getSubjectIds() != null) {
                Set<Subject> subjects = new HashSet<>();
                for (Long subjectId : request.getSubjectIds()) {
                    Subject subject = subjectRepository.findById(subjectId)
                            .orElseThrow(() -> new RuntimeException("Subject not found: " + subjectId));
                    subjects.add(subject);
                }
                teacher.setSubjects(subjects);
            }
            
            // Update grades
            if (request.getGradeIds() != null) {
                Set<Grade> grades = new HashSet<>();
                for (Long gradeId : request.getGradeIds()) {
                    Grade grade = gradeRepository.findById(gradeId)
                            .orElseThrow(() -> new RuntimeException("Grade not found: " + gradeId));
                    grades.add(grade);
                }
                teacher.setGrades(grades);
            }
            
            teacherRepository.save(teacher);
        } else if (user.getRole() == User.Role.STUDENT && request.getGradeId() != null) {
            Student student = studentRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Student profile not found"));
            Grade grade = gradeRepository.findById(request.getGradeId())
                    .orElseThrow(() -> new RuntimeException("Grade not found"));
            student.setGrade(grade);
            studentRepository.save(student);
        }
        
        return mapToUserResponse(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Delete role-specific entity first
        switch (user.getRole()) {
            case TEACHER:
                teacherRepository.findByUserId(id).ifPresent(teacherRepository::delete);
                break;
            case STUDENT:
                studentRepository.findByUserId(id).ifPresent(studentRepository::delete);
                break;
            case PARENT:
                parentRepository.findByUserId(id).ifPresent(parentRepository::delete);
                break;
            case ADMIN:
            default:
                // Admin has no additional entity to delete
                break;
        }
        
        userRepository.delete(user);
    }

    @Transactional
    public UserResponse activateUser(Long id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(active);
        userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse resetPassword(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String newPassword = generatePassword();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        UserResponse response = mapToUserResponse(user);
        response.setGeneratedPassword(newPassword);
        return response;
    }

    private UserResponse mapToUserResponse(User user) {
        UserResponse.UserResponseBuilder builder = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt());
        
        // Add role-specific data
        if (user.getRole() == User.Role.TEACHER) {
            teacherRepository.findByUserId(user.getId()).ifPresent(teacher -> {
                builder.subjectIds(teacher.getSubjects().stream().map(Subject::getId).collect(Collectors.toList()));
                builder.gradeIds(teacher.getGrades().stream().map(Grade::getId).collect(Collectors.toList()));
            });
        } else if (user.getRole() == User.Role.STUDENT) {
            studentRepository.findByUserId(user.getId()).ifPresent(student -> {
                if (student.getGrade() != null) {
                    builder.gradeId(student.getGrade().getId());
                }
            });
        }
        
        return builder.build();
    }

    private String generateUsername(String fullName) {
        String base = fullName.toLowerCase().replaceAll("\\s+", ".");
        String username = base;
        int counter = 1;
        while (userRepository.existsByUsername(username)) {
            username = base + counter++;
        }
        return username;
    }

    private String generatePassword() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    // Grade statistics
    public Map<String, Long> getStudentCountByGrade() {
        Map<String, Long> stats = new HashMap<>();
        List<Grade> grades = gradeRepository.findAll();
        for (Grade grade : grades) {
            long count = studentRepository.countByGradeId(grade.getId());
            stats.put(grade.getName(), count);
        }
        return stats;
    }
}
