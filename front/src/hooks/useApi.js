import axios from 'axios';

// URL base para la API
const API_URL = 'http://localhost:5199';

// Configuración base de axios
const baseConfig = {
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
  }
};

// Instancia de axios
const api = axios.create(baseConfig);

// -------- Funciones relacionadas con WeatherForecast --------
export const obtenerClima = () => api.get('/WeatherForecast');

export const obtenerEmpleados = () => api.get('/api/Empleado');
export const obtenerEmpleadosPorId = (id) => api.get(`/api/Empleado/${id}`);
export const crearEmpleado = (data) => api.post('/api/Empleado', data);
export const actualizarEmpleado = (data) => api.put(`/api/Empleado/`, data);
export const eliminarEmpleado = (id) => api.delete(`/api/Empleado/${id}`);

// -------- Agregar más rutas según sea necesario --------


// Exportar la instancia para su uso en otros módulos
export { api };
export default api;
