import api from '../api/axiosConfig';

/**
 * Item service for CRUD operations
 */
export const itemService = {
  async getAll() {
    const response = await api.get('/items');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  async create(itemData) {
    const response = await api.post('/items', itemData);
    return response.data;
  },

  async update(id, itemData) {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/items/${id}`);
  },

  async uploadPhoto(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/items/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};