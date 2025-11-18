package com.office.backend.mapper;

import com.office.backend.dto.ItemRequest;
import com.office.backend.dto.ItemResponse;
import com.office.backend.model.Item;
import com.office.backend.model.User;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Item entity and DTOs
 */
@Component
public class ItemMapper {

    /**
     * Convert Item entity to ItemResponse DTO
     */
    public ItemResponse toResponse(Item item) {
        if (item == null) {
            return null;
        }
        
        ItemResponse response = new ItemResponse();
        response.setId(item.getId());
        response.setName(item.getName());
        response.setDescription(item.getDescription());
        response.setPhotoPath(item.getPhotoPath());
        response.setCreatedAt(item.getCreatedAt());
        response.setUpdatedAt(item.getUpdatedAt());
        
        return response;
    }

    /**
     * Convert ItemRequest DTO to Item entity
     */
    public Item toEntity(ItemRequest request, User user) {
        if (request == null) {
            return null;
        }
        
        Item item = new Item();
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setUser(user);
        
        return item;
    }

    /**
     * Update existing Item entity with data from ItemRequest DTO
     */
    public void updateEntity(Item item, ItemRequest request) {
        if (item == null || request == null) {
            return;
        }
        
        item.setName(request.getName());
        item.setDescription(request.getDescription());
    }
}