package com.office.backend.domain.repository;

import com.office.backend.domain.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    List<Product> findAll();
    List<Product> findByCategory(String category);
    Optional<Product> findById(Long id);
    Product save(Product product);
    void deleteById(Long id);
}