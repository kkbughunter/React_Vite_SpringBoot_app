package com.office.backend.controller;

import com.office.backend.dto.ItemRequest;
import com.office.backend.dto.ItemResponse;
import com.office.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * REST Controller for Item operations
 * All endpoints require JWT authentication
 * Users can only access their own items
 */
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {
    
    private final ItemService itemService;
    
    @GetMapping
    public List<ItemResponse> getAllItems(Authentication auth) {
        return itemService.getAllItems(auth.getName());
    }
    
    @GetMapping("/{id}")
    public ItemResponse getItemById(@PathVariable Long id, Authentication auth) {
        return itemService.getItemById(id, auth.getName());
    }
    
    @PostMapping
    public ItemResponse createItem(@RequestBody ItemRequest request, Authentication auth) {
        return itemService.createItem(request, auth.getName());
    }
    
    @PutMapping("/{id}")
    public ItemResponse updateItem(@PathVariable Long id, @RequestBody ItemRequest request, Authentication auth) {
        return itemService.updateItem(id, request, auth.getName());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id, Authentication auth) {
        itemService.deleteItem(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/photo")
    public ItemResponse uploadPhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file, Authentication auth) {
        return itemService.uploadPhoto(id, file, auth.getName());
    }
}