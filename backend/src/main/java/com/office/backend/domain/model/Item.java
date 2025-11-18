package com.office.backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    private Long id;
    private Long userId;
    private Product product;
    private LocalDateTime createdAt;
    
    public Item(Long userId, Product product) {
        this.userId = userId;
        this.product = product;
        this.createdAt = LocalDateTime.now();
    }
}