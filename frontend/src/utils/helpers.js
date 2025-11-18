/**
 * Helper utility functions
 */

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const validateFile = (file) => {
  if (!file) return { valid: false, error: 'No file selected' };
  
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please select an image file' };
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  return { valid: true };
};

export const getImageUrl = (photoPath) => {
  if (!photoPath) return null;
  return `http://localhost:8080/api/files/${photoPath}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};