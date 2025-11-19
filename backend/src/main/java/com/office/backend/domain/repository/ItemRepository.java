package com.office.backend.domain.repository;

import com.office.backend.domain.model.Item;
import java.util.List;
import java.util.Optional;

public interface ItemRepository {
    List<Item> findByUserId(Long userId);
    Item save(Item item);
    Optional<Item> findById(Long id);
    void deleteById(Long id);
    void deleteByProductId(Long productId);
}