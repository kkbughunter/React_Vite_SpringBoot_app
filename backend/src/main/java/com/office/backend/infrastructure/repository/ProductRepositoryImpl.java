package com.office.backend.infrastructure.repository;

import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.ProductRepository;
import com.office.backend.infrastructure.persistence.ProductEntity;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ProductRepositoryImpl implements ProductRepository {
    private final JpaProductRepository jpaProductRepository;
    
    public ProductRepositoryImpl(JpaProductRepository jpaProductRepository) {
        this.jpaProductRepository = jpaProductRepository;
    }
    
    @Override
    public List<Product> findAll() {
        return jpaProductRepository.findAll().stream()
            .map(this::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public List<Product> findByCategory(String category) {
        return jpaProductRepository.findByCategory(category).stream()
            .map(this::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public Optional<Product> findById(Long id) {
        return jpaProductRepository.findById(id).map(this::toDomain);
    }
    
    @Override
    public Product save(Product product) {
        ProductEntity entity = toEntity(product);
        ProductEntity saved = jpaProductRepository.save(entity);
        return toDomain(saved);
    }
    
    @Override
    public void deleteById(Long id) {
        jpaProductRepository.deleteById(id);
    }
    
    private Product toDomain(ProductEntity entity) {
        Product product = new Product();
        product.setId(entity.getId());
        product.setName(entity.getName());
        product.setDescription(entity.getDescription());
        product.setPrice(entity.getPrice());
        product.setStock(entity.getStock());
        product.setCategory(entity.getCategory());
        product.setImagePath(entity.getImagePath());
        product.setCreatedAt(entity.getCreatedAt());
        product.setUpdatedAt(entity.getUpdatedAt());
        return product;
    }
    
    private ProductEntity toEntity(Product product) {
        ProductEntity entity = new ProductEntity();
        entity.setId(product.getId());
        entity.setName(product.getName());
        entity.setDescription(product.getDescription());
        entity.setPrice(product.getPrice());
        entity.setStock(product.getStock());
        entity.setCategory(product.getCategory());
        entity.setImagePath(product.getImagePath());
        entity.setCreatedAt(product.getCreatedAt());
        entity.setUpdatedAt(product.getUpdatedAt());
        return entity;
    }
}