import axios from "axios";
import type { LoginData, RegisterData, User } from "../types/userTypes";

const API_URL = "http://tu-api.com/api/auth"; // Reemplaza con tu URL

export const userApi = {
  login: async (data: LoginData): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },

  // Opcional: Verificar token
  verifyToken: async (token: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
