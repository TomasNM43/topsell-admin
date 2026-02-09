import { useState, useEffect } from 'react';
import { Upload, message, Image } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import imageService from '../services/imageService';

/**
 * Componente reutilizable para subir imágenes
 * @param {string} value - URL de la imagen actual
 * @param {function} onChange - Callback cuando la imagen cambia (retorna la URL)
 * @param {string} folder - Carpeta de destino en el servidor
 * @param {number} maxSizeMB - Tamaño máximo en MB (default: 5)
 */
const ImageUpload = ({ value, onChange, folder = 'general', maxSizeMB = 5 }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);

  // Sincronizar el estado interno con la prop value cuando cambia
  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  // Validar archivo antes de subirlo
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Solo puedes subir archivos de imagen!');
      return false;
    }

    const isLtMaxSize = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMaxSize) {
      message.error(`La imagen debe ser menor a ${maxSizeMB}MB!`);
      return false;
    }

    return true;
  };

  // Manejar la subida de la imagen
  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    setLoading(true);
    try {
      // Subir imagen al servidor
      const url = await imageService.upload(file, folder);
      
      setImageUrl(url);
      onChange?.(url); // Notificar al Form.Item del cambio
      onSuccess(url);
      message.success('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error al subir imagen:', error);
      onError(error);
      message.error('Error al subir la imagen');
    } finally {
      setLoading(false);
    }
  };

  // Botón de upload
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {loading ? 'Subiendo...' : 'Subir Imagen'}
      </div>
    </div>
  );

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="image-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={handleUpload}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="imagen"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          preview={true}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
