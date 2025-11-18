package com.office.backend.application.usecases;

import com.office.backend.domain.model.User;
import com.office.backend.domain.repository.UserRepository;
import com.office.backend.domain.services.AuthDomainService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserUseCase {
    private final UserRepository userRepository;
    private final AuthDomainService authDomainService;
    private final PasswordEncoder passwordEncoder;
    
    public RegisterUserUseCase(UserRepository userRepository, AuthDomainService authDomainService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authDomainService = authDomainService;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User execute(String username, String password) {
        if (!authDomainService.isUsernameAvailable(username)) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User(username, passwordEncoder.encode(password));
        return userRepository.save(user);
    }
}