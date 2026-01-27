import api from '../config/api';

const bannerService = {
  // Obtener todos los banners (admin)
  getAll: async () => {
    const response = await api.get('/api/banners/admin');
    return response.data;
  },

  // Obtener un banner por ID
  getById: async (id) => {
    const response = await api.get(`/api/banners/admin/${id}`);
    return response.data;
  },

  // Crear un nuevo banner
  create: async (bannerData) => {
    const response = await api.post('/api/banners/admin', bannerData);
    return response.data;
  },

  // Actualizar un banner
  update: async (id, bannerData) => {
    const response = await api.put(`/api/banners/admin/${id}`, bannerData);
    return response.data;
  },

  // Eliminar un banner
  delete: async (id) => {
    const response = await api.delete(`/api/banners/admin/${id}`);
    return response.data;
  },
};

export default bannerService;
