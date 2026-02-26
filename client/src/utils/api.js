import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if needed
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('rexUser'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default api;
export { API_URL };
