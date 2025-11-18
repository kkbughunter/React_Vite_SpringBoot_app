package com.office.backend.infrastructure.repository;

import com.office.backend.infrastructure.persistence.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JpaItemRepository extends JpaRepository<ItemEntity, Long> {
    List<ItemEntity> findByUserId(Long userId);
}