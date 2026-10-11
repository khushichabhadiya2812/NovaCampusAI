import axios from 'axios';

const API = axios.create({
  baseURL: 'https://novacampusai.onrender.com/api',
});

// Automatically attach JWT token agar user logged in ho
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;