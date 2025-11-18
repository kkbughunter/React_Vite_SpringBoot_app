package com.office.backend.domain.events;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderCreatedEvent {
    private final Long orderId;
    private final Long userId;
    private final LocalDateTime occurredAt;
    
    public OrderCreatedEvent(Long orderId, Long userId) {
        this.orderId = orderId;
        this.userId = userId;
        this.occurredAt = LocalDateTime.now();
    }
}