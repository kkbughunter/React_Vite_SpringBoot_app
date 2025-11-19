package com.office.backend.presentation.controllers;

import com.office.backend.domain.model.Item;
import com.office.backend.domain.model.Product;
import com.office.backend.domain.repository.ItemRepository;
import com.office.backend.domain.repository.ProductRepository;
import java.math.BigDecimal;
import org.springframework.http.ResponseEntity;
import com.office.backend.infrastructure.security.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {
    
    private final ItemRepository itemRepository;
    private final ProductRepository productRepository;
    private final JwtUtil jwtUtil;
    
    public ItemController(ItemRepository itemRepository, ProductRepository productRepository, JwtUtil jwtUtil) {
        this.itemRepository = itemRepository;
        this.productRepository = productRepository;
        this.jwtUtil = jwtUtil;
    }
    
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Long userId = getUserIdFromToken(authHeader);
        List<Item> items = itemRepository.findByUserId(userId);
        return ResponseEntity.ok(items);
    }
    
    @PostMapping
    @Transactional
    public ResponseEntity<Map<String, Object>> createItem(@RequestBody Map<String, Object> itemData, 
                                                          @RequestHeader(value = "Authorization", required = false) String authHeader) {
        // First create product
        Product product = new Product(
            (String) itemData.get("name"),
            (String) itemData.get("description"),
            new BigDecimal(itemData.getOrDefault("price", "0.00").toString()),
            Integer.parseInt(itemData.getOrDefault("stock", "1").toString()),
            (String) itemData.getOrDefault("category", "User Submitted")
        );
        product.setImagePath((String) itemData.get("imagePath"));
        Product savedProduct = productRepository.save(product);
        
        // Then track in items table which user created this product
        Long userId = getUserIdFromToken(authHeader);
        Item item = new Item(userId, savedProduct);
        Item savedItem = itemRepository.save(item);
        
        return ResponseEntity.ok(Map.of(
            "item", savedItem,
            "product", savedProduct,
            "message", "Product added successfully"
        ));
    }
    
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    private Long getUserIdFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return 1L; // Default user for demo
        }
        
        try {
            String token = authHeader.substring(7);
            Long userId = jwtUtil.getUserIdFromToken(token);
            return userId != null ? userId : 1L; // Ensure non-null userId
        } catch (Exception e) {
            return 1L; // Default user if token is invalid
        }
    }
}