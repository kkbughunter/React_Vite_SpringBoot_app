package com.office.backend.application.mappers;

import com.office.backend.domain.model.Product;
import com.office.backend.application.dto.ProductResponse;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setCategory(product.getCategory());
        response.setImagePath(product.getImagePath());
        response.setCreatedAt(product.getCreatedAt());
        return response;
    }
}