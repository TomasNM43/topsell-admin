import { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import imageService from '../services/imageService';

/**
 * Componente para subir múltiples imágenes
 * @param {array} value - Array de URLs de imágenes actuales
 * @param {function} onChange - Callback cuando las imágenes cambian (retorna array de URLs)
 * @param {string} folder - Carpeta de destino en el servidor
 * @param {number} maxCount - Número máximo de imágenes (default: 5)
 * @param {number} maxSizeMB - Tamaño máximo en MB (default: 5)
 */
const MultipleImageUpload = ({ 
  value = [], 
  onChange, 
  folder = 'general', 
  maxCount = 5,
  maxSizeMB = 5 
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Sincronizar fileList con value (URLs del Form)
  const fileList = (value && value.length > 0) 
    ? value.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}`,
        status: 'done',
        url: url,
      }))
    : [];

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

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const url = await imageService.upload(file, folder);
      
      onSuccess(url);
      message.success('Imagen subida exitosamente');
      
      // Actualizar el array de URLs
      const newUrls = [...(value || []), url];
      onChange?.(newUrls);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      onError(error);
      message.error('Error al subir la imagen');
    }
  };

  const handleChange = () => {
    // El fileList se maneja automáticamente a través de value
  };

  const handleRemove = (file) => {
    const newUrls = (value || []).filter(url => url !== file.url);
    onChange?.(newUrls);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemove}
        maxCount={maxCount}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MultipleImageUpload;
