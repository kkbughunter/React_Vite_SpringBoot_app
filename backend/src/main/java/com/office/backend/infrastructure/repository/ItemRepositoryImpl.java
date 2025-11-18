package com.office.backend.infrastructure.repository;

import com.office.backend.domain.model.Item;
import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.ItemRepository;
import com.office.backend.infrastructure.persistence.ItemEntity;
import com.office.backend.infrastructure.persistence.ProductEntity;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ItemRepositoryImpl implements ItemRepository {
    private final JpaItemRepository jpaItemRepository;
    
    public ItemRepositoryImpl(JpaItemRepository jpaItemRepository) {
        this.jpaItemRepository = jpaItemRepository;
    }
    
    @Override
    public List<Item> findByUserId(Long userId) {
        return jpaItemRepository.findByUserId(userId).stream()
            .map(this::toDomain)
            .collect(Collectors.toList());
    }
    
    @Override
    public Item save(Item item) {
        ItemEntity entity = toEntity(item);
        ItemEntity saved = jpaItemRepository.save(entity);
        return toDomain(saved);
    }
    
    @Override
    public Optional<Item> findById(Long id) {
        return jpaItemRepository.findById(id).map(this::toDomain);
    }
    
    @Override
    public void deleteById(Long id) {
        jpaItemRepository.deleteById(id);
    }
    
    private Item toDomain(ItemEntity entity) {
        Product product = toDomainProduct(entity.getProduct());
        return new Item(
            entity.getId(),
            entity.getUserId(),
            product,
            entity.getCreatedAt()
        );
    }
    
    private ItemEntity toEntity(Item item) {
        ItemEntity entity = new ItemEntity();
        entity.setId(item.getId());
        entity.setUserId(item.getUserId());
        entity.setProduct(toEntityProduct(item.getProduct()));
        entity.setCreatedAt(item.getCreatedAt());
        return entity;
    }
    
    private Product toDomainProduct(ProductEntity entity) {
        return new Product(
            entity.getId(),
            entity.getName(),
            entity.getDescription(),
            entity.getPrice(),
            entity.getStock(),
            entity.getCategory(),
            entity.getImagePath(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }
    
    private ProductEntity toEntityProduct(Product product) {
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