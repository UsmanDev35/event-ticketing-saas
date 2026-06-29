// frontend/src/services/auth.service.js
import api from './api';

export const loginApi = async (email, password) => {
  try {
    // This sends a POST request to http://localhost:3000/api/auth/login
    const response = await api.post('/auth/login', { email, password });
    
    // Axios automatically deserializes the JSON response [cite: 1404-1408]
    return response.data; 
  } catch (error) {
    // Pass the generic backend error message to the frontend
    throw error.response?.data?.message || 'Network error occurred';
  }
};


export const registerApi = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || 'Network error occurred';
  }
};

export const googleLoginApi = async (credential) => {
  try {
    const response = await api.post('/auth/google', { credential });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Google Login failed';
  }
};