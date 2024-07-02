import axios from 'axios';
import { authStore } from '../store/authStore';

const axiosInstance = axios.create({
  baseURL: 'http://92.118.8.138/api/', // Adjust the base URL as needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStore.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
