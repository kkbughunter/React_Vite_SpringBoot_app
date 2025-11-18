package com.office.backend.mapper;

import com.office.backend.dto.UserResponse;
import com.office.backend.model.User;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between User entity and DTOs
 */
@Component
public class UserMapper {

    /**
     * Convert User entity to UserResponse DTO
     */
    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        
        return response;
    }
}