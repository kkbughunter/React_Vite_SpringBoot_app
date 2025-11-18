package com.office.backend.service;

import com.office.backend.dto.ItemRequest;
import com.office.backend.dto.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Service interface for Item operations
 * All operations are user-specific (users can only access their own items)
 */
public interface ItemService {
    
    List<ItemResponse> getAllItems(String username);
    
    ItemResponse getItemById(Long id, String username);
    
    ItemResponse createItem(ItemRequest request, String username);
    
    ItemResponse updateItem(Long id, ItemRequest request, String username);
    
    void deleteItem(Long id, String username);
    
    ItemResponse uploadPhoto(Long id, MultipartFile file, String username);
}