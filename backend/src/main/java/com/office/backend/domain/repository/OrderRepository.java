package com.office.backend.domain.repository;

import com.office.backend.domain.model.Order;
import java.util.List;
import java.util.Optional;

public interface OrderRepository {
    List<Order> findByUserId(Long userId);
    Optional<Order> findById(Long id);
    Order save(Order order);
}