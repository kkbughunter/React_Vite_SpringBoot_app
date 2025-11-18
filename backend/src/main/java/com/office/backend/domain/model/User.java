package com.office.backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String username;
    private String password;
    private String role = "ROLE_USER";
    
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}