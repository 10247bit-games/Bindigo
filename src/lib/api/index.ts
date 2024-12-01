import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from './config';
import { mockApi } from './mockApi';
import { getConfig } from '@/config/modes';

const config = getConfig();

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

if (!config.features.multiplayer) {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: unknown) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
}

const api: AxiosInstance | typeof mockApi = config.features.multiplayer ? mockApi : axiosInstance;

export default api;