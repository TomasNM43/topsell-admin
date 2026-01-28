import api from '../config/api';

const userService = {
  // Obtener todos los usuarios (admin)
  getAll: async () => {
    const response = await api.get('/api/users/admin');
    return response.data;
  },

  // Obtener un usuario por ID
  getById: async (id) => {
    const response = await api.get(`/api/users/admin/${id}`);
    return response.data;
  },

  // Actualizar un usuario
  update: async (id, userData) => {
    const response = await api.put(`/api/users/admin/${id}`, userData);
    return response.data;
  },

  // Eliminar un usuario
  delete: async (id) => {
    const response = await api.delete(`/api/users/admin/${id}`);
    return response.data;
  },
};

export default userService;
