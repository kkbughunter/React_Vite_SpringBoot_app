package com.office.backend.application.usecases;

import com.office.backend.domain.model.Order;
import com.office.backend.domain.model.OrderItem;
import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.OrderRepository;
import com.office.backend.domain.repository.ProductRepository;
import com.office.backend.domain.services.OrderDomainService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreateOrderUseCase {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderDomainService orderDomainService;
    
    public CreateOrderUseCase(OrderRepository orderRepository, ProductRepository productRepository, OrderDomainService orderDomainService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderDomainService = orderDomainService;
    }
    
    public Order execute(Long userId, List<OrderItemRequest> itemRequests) {
        List<OrderItem> items = itemRequests.stream()
            .map(this::toOrderItem)
            .collect(Collectors.toList());
            
        Order order = orderDomainService.createOrder(userId, items);
        
        // Reduce stock
        items.forEach(item -> {
            Product product = productRepository.findById(item.getProductId()).orElseThrow();
            product.reduceStock(item.getQuantity());
            productRepository.save(product);
        });
        
        return orderRepository.save(order);
    }
    
    private OrderItem toOrderItem(OrderItemRequest request) {
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return new OrderItem(product.getId(), product.getName(), product.getPrice(), request.getQuantity());
    }
    
    public static class OrderItemRequest {
        public Long productId;
        public Integer quantity;
        
        public Long getProductId() { return productId; }
        public Integer getQuantity() { return quantity; }
    }
}