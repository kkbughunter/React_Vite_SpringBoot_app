import API from '../api/axiosConfig';

export const authService = {
  async login(credentials) {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData) {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};