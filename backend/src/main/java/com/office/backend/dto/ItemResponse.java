package com.office.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ItemResponse {
    private Long id;
    private String name;
    private String description;
    private String photoPath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}