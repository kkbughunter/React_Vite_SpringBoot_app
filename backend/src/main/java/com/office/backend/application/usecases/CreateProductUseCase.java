package com.office.backend.application.usecases;

import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class CreateProductUseCase {
    private final ProductRepository productRepository;
    
    public CreateProductUseCase(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public Product execute(String name, String description, BigDecimal price, Integer stock, String category) {
        Product product = new Product(name, description, price, stock, category);
        return productRepository.save(product);
    }
}