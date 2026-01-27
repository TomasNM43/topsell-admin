import api from '../config/api';

const categoryService = {
  // Obtener todas las categorías (admin)
  getAll: async () => {
    const response = await api.get('/api/categories/admin');
    return response.data;
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const response = await api.get(`/api/categories/admin/${id}`);
    return response.data;
  },

  // Crear una nueva categoría
  create: async (categoryData) => {
    const response = await api.post('/api/categories/admin', categoryData);
    return response.data;
  },

  // Actualizar una categoría
  update: async (id, categoryData) => {
    const response = await api.put(`/api/categories/admin/${id}`, categoryData);
    return response.data;
  },

  // Eliminar una categoría
  delete: async (id) => {
    const response = await api.delete(`/api/categories/admin/${id}`);
    return response.data;
  },
};

export default categoryService;
