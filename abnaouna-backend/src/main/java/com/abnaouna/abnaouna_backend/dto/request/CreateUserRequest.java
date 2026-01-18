package com.abnaouna.abnaouna_backend.dto.request;

import com.abnaouna.abnaouna_backend.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    private String email;
    
    private String phone;
    
    // Optional for specialized endpoints (/teachers, /students, /parents)
    // Required for generic /users endpoint
    private User.Role role;
    
    // For Teacher
    private Long[] subjectIds;
    private Long[] gradeIds;
    
    // For Student
    private Long gradeId;
    private Long parentId;
    
    // For assigning children to parent
    private Long[] childrenIds;
}

