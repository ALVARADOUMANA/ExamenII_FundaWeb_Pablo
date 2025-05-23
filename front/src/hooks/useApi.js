//front\src\hooks\useApi.js
import axios from 'axios';

// URL base para la API
const API_URL = 'http://localhost:5001';

// Configuración base de axios
const baseConfig = {
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
  }
};

// Instancia de axios
const api = axios.create(baseConfig);

export const obtenerCultures = () => api.get('/api/Culture');
export const obtenerCulturePorId = (id) => api.get(`/api/Culture/${id}`);
export const crearCulture = (data) => api.post('/api/Culture', data);
export const actualizarCulture = (data) => api.put(`/api/Culture/`, data);
export const eliminarCulture = (id) => api.delete(`/api/Culture/${id}`);

// -------- Agregar más rutas según sea necesario --------


// Exportar la instancia para su uso en otros módulos
export { api };
export default api;
