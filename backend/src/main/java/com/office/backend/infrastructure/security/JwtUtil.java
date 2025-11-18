package com.office.backend.infrastructure.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JwtUtil {
    
    @Value("${app.jwt.secret}")
    private String secret;
    
    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;
    
    // Simple in-memory token store for demo
    private final Map<String, TokenData> tokenStore = new ConcurrentHashMap<>();
    
    public String generateToken(Long userId, String username) {
        String token = Base64.getEncoder().encodeToString(
            (userId + ":" + username + ":" + System.currentTimeMillis()).getBytes()
        );
        tokenStore.put(token, new TokenData(userId, username, System.currentTimeMillis() + expirationMs));
        return token;
    }
    
    public Long getUserIdFromToken(String token) {
        TokenData data = tokenStore.get(token);
        if (data != null && data.expiresAt > System.currentTimeMillis()) {
            return data.userId;
        }
        return null;
    }
    
    public String getUsernameFromToken(String token) {
        TokenData data = tokenStore.get(token);
        if (data != null && data.expiresAt > System.currentTimeMillis()) {
            return data.username;
        }
        return null;
    }
    
    public boolean validateToken(String token) {
        TokenData data = tokenStore.get(token);
        return data != null && data.expiresAt > System.currentTimeMillis();
    }
    
    private static class TokenData {
        final Long userId;
        final String username;
        final long expiresAt;
        
        TokenData(Long userId, String username, long expiresAt) {
            this.userId = userId;
            this.username = username;
            this.expiresAt = expiresAt;
        }
    }
}