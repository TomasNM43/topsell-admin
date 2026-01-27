import api from '../config/api';

const brandService = {
  // Obtener todas las marcas (admin)
  getAll: async () => {
    const response = await api.get('/api/brands/admin');
    return response.data;
  },

  // Obtener una marca por ID
  getById: async (id) => {
    const response = await api.get(`/api/brands/admin/${id}`);
    return response.data;
  },

  // Crear una nueva marca
  create: async (brandData) => {
    const response = await api.post('/api/brands/admin', brandData);
    return response.data;
  },

  // Actualizar una marca
  update: async (id, brandData) => {
    const response = await api.put(`/api/brands/admin/${id}`, brandData);
    return response.data;
  },

  // Eliminar una marca
  delete: async (id) => {
    const response = await api.delete(`/api/brands/admin/${id}`);
    return response.data;
  },
};

export default brandService;
