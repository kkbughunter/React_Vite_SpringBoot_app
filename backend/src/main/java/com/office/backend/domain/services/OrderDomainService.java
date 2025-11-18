package com.office.backend.domain.services;

import com.office.backend.domain.model.Order;
import com.office.backend.domain.model.OrderItem;
import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.ProductRepository;
import java.util.List;

public class OrderDomainService {
    private final ProductRepository productRepository;
    
    public OrderDomainService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public Order createOrder(Long userId, List<OrderItem> items) {
        validateOrderItems(items);
        return new Order(userId, items);
    }
    
    private void validateOrderItems(List<OrderItem> items) {
        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            
            if (!product.isInStock()) {
                throw new IllegalArgumentException("Product out of stock: " + product.getName());
            }
            
            if (product.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for: " + product.getName());
            }
        }
    }
}