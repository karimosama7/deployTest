package com.abnaouna.abnaouna_backend.repository;

import com.abnaouna.abnaouna_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    List<User> findByRole(User.Role role);
    
    Optional<User> findByEmail(String email);
}
