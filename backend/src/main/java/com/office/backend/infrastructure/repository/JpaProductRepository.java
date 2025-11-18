package com.office.backend.infrastructure.repository;

import com.office.backend.infrastructure.persistence.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JpaProductRepository extends JpaRepository<ProductEntity, Long> {
    List<ProductEntity> findByCategory(String category);
}