import api from '../config/api';

const productService = {
  // Obtener todos los productos (admin)
  getAll: async () => {
    const response = await api.get('/api/products/admin');
    return response.data;
  },

  // Obtener un producto por ID
  getById: async (id) => {
    const response = await api.get(`/api/products/admin/${id}`);
    return response.data;
  },

  // Crear un nuevo producto
  create: async (productData) => {
    const response = await api.post('/api/products/admin', productData);
    return response.data;
  },

  // Actualizar un producto
  update: async (id, productData) => {
    const response = await api.put(`/api/products/admin/${id}`, productData);
    return response.data;
  },

  // Eliminar un producto
  delete: async (id) => {
    const response = await api.delete(`/api/products/admin/${id}`);
    return response.data;
  },
};

export default productService;
