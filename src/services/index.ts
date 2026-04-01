import { createApi } from './createApi';
import { getToken, saveToken, removeToken } from './tokenService';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getToken();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

export const AuthAPI = createApi(`${API_BASE_URL}/auth`);

export const TabAPI = createApi(`${API_BASE_URL}/tabs`, getAuthHeaders);

export { saveToken, getToken, removeToken };
