import axios from 'axios';

// Replace with your local IP or Gateway domain when testing on physical device/emulator
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    // Inject JWT token from secure storage or Redux state
    return config;
  },
  (error) => Promise.reject(error)
);
