package com.office.backend.domain.services;

import com.office.backend.domain.model.User;
import com.office.backend.domain.repository.UserRepository;

public class AuthDomainService {
    private final UserRepository userRepository;
    
    public AuthDomainService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public boolean isUsernameAvailable(String username) {
        return userRepository.findByUsername(username).isEmpty();
    }
}