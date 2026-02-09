import  api  from '../config/api';

const contactService = {
  getAll: async () => {
    const response = await api.get('/api/contacts/admin');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/contacts/admin/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/contacts/admin/${id}`);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/api/contacts/admin/${id}/read`);
    return response.data;
  }
};

export default contactService;
