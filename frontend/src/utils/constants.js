/**
 * Application constants
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ITEMS: '/items'
};

export const FILE_TYPES = {
  IMAGES: 'image/*'
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB