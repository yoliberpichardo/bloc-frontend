import axios from "axios";
import type {
  LoginData,
  RegisterData,
  User,
  AuthResponse,
} from "../types/userTypes";

const API_URL = "http://localhost:7089/api/auth";

// Configura interceptores para manejar errores globalmente
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data.message || "Error en la solicitud",
        status: error.response.status,
      });
    }
    return Promise.reject({ message: "Error de conexión", status: 500 });
  }
);

export const userApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/register`,
      data
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  verifyToken: async (token: string): Promise<User> => {
    const response = await axios.get<{ user: User }>(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
