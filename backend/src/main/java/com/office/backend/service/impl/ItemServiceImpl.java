package com.office.backend.service.impl;

import com.office.backend.dto.ItemRequest;
import com.office.backend.dto.ItemResponse;
import com.office.backend.mapper.ItemMapper;
import com.office.backend.model.Item;
import com.office.backend.model.User;
import com.office.backend.repository.ItemRepository;
import com.office.backend.repository.UserRepository;
import com.office.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

/**
 * Implementation of ItemService
 * Handles all CRUD operations for items with user-specific access control
 */
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemMapper itemMapper;
    
    private static final String UPLOAD_DIR = "uploads/";
    
    @Override
    public List<ItemResponse> getAllItems(String username) {
        User user = findUserByUsername(username);
        return itemRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(itemMapper::toResponse)
                .toList();
    }
    
    @Override
    public ItemResponse getItemById(Long id, String username) {
        User user = findUserByUsername(username);
        Item item = itemRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Item not found or access denied"));
        return itemMapper.toResponse(item);
    }
    
    @Override
    @Transactional
    public ItemResponse createItem(ItemRequest request, String username) {
        User user = findUserByUsername(username);
        Item item = itemMapper.toEntity(request, user);
        Item saved = itemRepository.save(item);
        return itemMapper.toResponse(saved);
    }
    
    @Override
    @Transactional
    public ItemResponse updateItem(Long id, ItemRequest request, String username) {
        User user = findUserByUsername(username);
        Item item = itemRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Item not found or access denied"));
        
        itemMapper.updateEntity(item, request);
        Item updated = itemRepository.save(item);
        return itemMapper.toResponse(updated);
    }
    
    @Override
    @Transactional
    public void deleteItem(Long id, String username) {
        User user = findUserByUsername(username);
        Item item = itemRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Item not found or access denied"));
        itemRepository.delete(item);
    }
    
    @Override
    public ItemResponse uploadPhoto(Long id, MultipartFile file, String username) {
        User user = findUserByUsername(username);
        Item item = itemRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Item not found or access denied"));
        
        try {
            String filename = saveUploadedFile(file);
            item.setPhotoPath(filename);
            Item updated = itemRepository.save(item);
            return itemMapper.toResponse(updated);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload photo: " + e.getMessage(), e);
        }
    }
    
    // Helper Methods
    
    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }
    
    private String saveUploadedFile(MultipartFile file) throws IOException {
        // Create uploads directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        
        // Save file
        Files.copy(file.getInputStream(), filePath);
        
        return filename;
    }
    

}