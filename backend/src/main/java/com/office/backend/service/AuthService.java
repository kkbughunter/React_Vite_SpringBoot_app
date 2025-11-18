package com.office.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.office.backend.model.User;
import com.office.backend.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo; this.encoder = encoder;
    }

    public User register(String username, String rawPassword) {
        User u = new User();
        u.setUsername(username);
        u.setPassword(encoder.encode(rawPassword));
        u.setRole("ROLE_USER");
        return repo.save(u);
    }
}
