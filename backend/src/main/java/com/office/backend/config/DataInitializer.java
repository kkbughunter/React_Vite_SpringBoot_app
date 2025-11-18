package com.office.backend.config;

import com.office.backend.service.AuthService;
import com.office.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final AuthService authService;
    private final UserRepository userRepository;
    
    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            authService.register("admin", "admin123");
            System.out.println("Default admin user created: admin/admin123");
        }
    }
}