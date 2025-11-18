package com.office.backend.presentation.controllers;

import com.office.backend.application.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        UserResponse user = new UserResponse();
        user.setId(1L);
        user.setUsername("demo-user");
        user.setRole("ROLE_USER");
        return ResponseEntity.ok(user);
    }
}