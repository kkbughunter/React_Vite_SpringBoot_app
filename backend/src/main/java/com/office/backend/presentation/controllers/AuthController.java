package com.office.backend.presentation.controllers;

import com.office.backend.application.dto.AuthRequest;
import com.office.backend.application.dto.UserResponse;
import com.office.backend.application.mappers.UserMapper;
import com.office.backend.application.usecases.RegisterUserUseCase;
import com.office.backend.domain.model.User;
import com.office.backend.domain.repository.UserRepository;
import com.office.backend.infrastructure.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final RegisterUserUseCase registerUserUseCase;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    
    public AuthController(RegisterUserUseCase registerUserUseCase, UserMapper userMapper, 
                         UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.registerUserUseCase = registerUserUseCase;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            if (request.getUsername() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest().body("Username and password are required");
            }
            User user = registerUserUseCase.execute(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(userMapper.toResponse(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
            
            User user = userOpt.get();
            // Verify password hash
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
            
            String token = jwtUtil.generateToken(user.getId(), user.getUsername());
            return ResponseEntity.ok(Map.of(
                "token", token,
                "user", userMapper.toResponse(user),
                "message", "Login successful"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed");
        }
    }
}