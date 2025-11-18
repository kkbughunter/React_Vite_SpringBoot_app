package com.office.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.office.backend.mapper.UserMapper;
import com.office.backend.model.User;
import com.office.backend.repository.UserRepository;
import com.office.backend.security.JwtUtil;
import com.office.backend.service.AuthService;

import java.util.Map;

/**
 * Authentication Controller
 * Handles user registration and login
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, AuthService authService, 
                         UserRepository userRepository, UserMapper userMapper) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
        try {
            String username = body.get("username");
            String password = body.get("password");
            
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            
            if (userRepository.findByUsername(username).isPresent()) {
                return ResponseEntity.badRequest().body("Username already exists");
            }
            
            User u = authService.register(username, password);
            return ResponseEntity.ok(userMapper.toResponse(u));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(body.get("username"), body.get("password"))
            );
            UserDetails ud = (UserDetails) auth.getPrincipal();
            String token = jwtUtil.generateToken(ud.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
