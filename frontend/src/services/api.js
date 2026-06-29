// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Because of our Vite proxy, this points to http://localhost:3000/api
  withCredentials: true, // 🚨 CRITICAL: Tells the browser to accept the HttpOnly cookie
  headers: {
    'Content-Type': 'application/json', // Content Negotiation: We send JSON [cite: 1098, 1100]
  },
});

export default api;