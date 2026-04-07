import { refreshToken, token } from '@/lib/refreshToken';
import axios, { type AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.antitedio.com.br/',
  // baseURL: 'http://192.168.0.101:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!status) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const novoToken = await refreshToken();
      api.defaults.headers.common['Authorization'] = `Bearer ${novoToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${novoToken}`;

      await new Promise(resolve => setTimeout(resolve, 3000));
      return api(originalRequest);
    }

    if (status === 403) {
      localStorage.removeItem('token');
      token.value = null;
    }

    if (status === 500 && !originalRequest._retry500) {
      originalRequest._retry500 = true;

      await new Promise(resolve => setTimeout(resolve, 3000));
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
)


export { api };
