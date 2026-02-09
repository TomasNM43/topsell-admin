import api from '../config/api';

const quoteService = {
  // Obtener todas las cotizaciones (admin)
  getAll: async () => {
    const response = await api.get('/api/quotes/admin');
    return response.data;
  },

  // Obtener una cotización por ID
  getById: async (id) => {
    const response = await api.get(`/api/quotes/admin/${id}`);
    return response.data;
  },

  // Eliminar una cotización
  delete: async (id) => {
    const response = await api.delete(`/api/quotes/admin/${id}`);
    return response.data;
  },
};

export default quoteService;
