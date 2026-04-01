import axios from 'axios';
import { getToken, saveToken, removeToken } from './tokenService';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const AuthAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
});

export const TabAPI = axios.create({
  baseURL: `${API_BASE_URL}/tabs`,
});

const addAuthInterceptor = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

addAuthInterceptor(TabAPI);

export { saveToken, getToken, removeToken };
