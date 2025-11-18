package com.office.backend.repository;

import com.office.backend.model.Item;
import com.office.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Item entity operations
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
    // Find all items for a specific user, ordered by creation date
    List<Item> findByUserOrderByCreatedAtDesc(User user);
    
    // Find item by ID that belongs to specific user
    Optional<Item> findByIdAndUser(Long id, User user);
}