import axios from "axios";
import type { Note, CreateNoteDto } from "../types/noteTypes";

const API_URL = "http://localhost:3000/api/notes";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export const notesApi = {
  getAllNotes: async (): Promise<Note[]> => {
    const response = await api.get<Note[]>("/");
    return response.data;
  },

  createNote: async (noteData: CreateNoteDto): Promise<Note> => {
    const response = await api.post<Note>("", noteData);
    return response.data;
  },

  updateNote: async (id: string, updates: Partial<Note>): Promise<Note> => {
    const response = await api.put<Note>(`/${id}`, updates);
    return response.data;
  },

  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
