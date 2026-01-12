package com.abnaouna.abnaouna_backend.dto.response;

import com.abnaouna.abnaouna_backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String fullName;
    private User.Role role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    // Generated credentials (only shown on creation)
    private String generatedPassword;
}
