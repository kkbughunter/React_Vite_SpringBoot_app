package com.office.backend.presentation.controllers;

import com.office.backend.application.dto.ProductRequest;
import com.office.backend.application.dto.ProductResponse;
import com.office.backend.application.mappers.ProductMapper;
import com.office.backend.application.usecases.CreateProductUseCase;
import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final CreateProductUseCase createProductUseCase;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    
    public ProductController(CreateProductUseCase createProductUseCase, ProductRepository productRepository, ProductMapper productMapper) {
        this.createProductUseCase = createProductUseCase;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }
    
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductResponse> responses = products.stream()
            .map(productMapper::toResponse)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
            .map(productMapper::toResponse)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productRepository.findById(id)
            .map(product -> {
                product.setName(request.getName());
                product.setDescription(request.getDescription());
                product.setPrice(request.getPrice());
                product.setStock(request.getStock());
                product.setCategory(request.getCategory());
                if (request.getImagePath() != null) {
                    product.setImagePath(request.getImagePath());
                }
                Product updated = productRepository.save(product);
                return ResponseEntity.ok(productMapper.toResponse(updated));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productRepository.findById(id).isPresent()) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    

}