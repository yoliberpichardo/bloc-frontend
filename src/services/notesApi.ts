import axios from "axios";

const API_URL = "http://localhost:7089/api/notes";

// Configura axios para incluir el token en todas las peticiones
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const notesApi = {
  getAllNotes: async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  },

  createNote: async (noteData: { title: string; description: string }) => {
    const response = await axios.post(`${API_URL}/`, noteData);
    return response.data;
  },

  updateNote: async (
    id: string,
    noteData: { title: string; description: string }
  ) => {
    const response = await axios.put(`${API_URL}/${id}`, noteData);
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
