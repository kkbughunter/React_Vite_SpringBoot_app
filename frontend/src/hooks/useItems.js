import { useState, useEffect, useCallback } from 'react';
import { itemService } from '../services/itemService';

/**
 * Custom hook for managing items state
 */
export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await itemService.getAll();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback(async (itemData) => {
    try {
      setError(null);
      const newItem = await itemService.create(itemData);
      setItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateItem = useCallback(async (id, itemData) => {
    try {
      setError(null);
      const updatedItem = await itemService.update(id, itemData);
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    try {
      setError(null);
      await itemService.delete(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const uploadPhoto = useCallback(async (id, file) => {
    try {
      setError(null);
      const updatedItem = await itemService.uploadPhoto(id, file);
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    uploadPhoto
  };
};