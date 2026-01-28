import api from '../config/api';

const imageService = {
  /**
   * Sube una imagen al servidor y retorna la URL
   * @param {File} file - Archivo de imagen a subir
   * @param {string} folder - Carpeta de destino (opcional: 'banners', 'products', 'brands', etc.)
   * @returns {Promise<string>} URL de la imagen subida
   */
  upload: async (file, folder = 'general') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await api.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url; // Asume que el backend retorna { url: "https://..." }
  },

  /**
   * Elimina una imagen del servidor (opcional)
   * @param {string} imageUrl - URL de la imagen a eliminar
   */
  delete: async (imageUrl) => {
    const response = await api.delete('/api/upload/image', {
      data: { imageUrl },
    });
    return response.data;
  },
};

export default imageService;
