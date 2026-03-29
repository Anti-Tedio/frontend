import { refreshToken, token } from '@/utils/refreshToken';
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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const novoToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${novoToken}`;

      originalRequest.headers['Authorization'] = `Bearer ${novoToken}`;

      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await delay(3000);
      return api(originalRequest);
    } else if (error.response.status === 403) {
      localStorage.removeItem('token')
      token.value=null
    }

    if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await delay(3000);
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
)


export { api };
