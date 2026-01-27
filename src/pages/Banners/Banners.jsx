import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Switch, InputNumber, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import bannerService from '../../services/bannerService';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await bannerService.getAll();
      setBanners(data);
    } catch (error) {
      message.error('Error al cargar los banners');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingBanner(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingBanner(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este banner?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await bannerService.delete(id);
          message.success('Banner eliminado exitosamente');
          fetchBanners();
        } catch (error) {
          message.error('Error al eliminar el banner');
          console.error(error);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (editingBanner) {
        await bannerService.update(editingBanner.id, values);
        message.success('Banner actualizado exitosamente');
      } else {
        await bannerService.create(values);
        message.success('Banner creado exitosamente');
      }
      setModalVisible(false);
      form.resetFields();
      fetchBanners();
    } catch (error) {
      message.error('Error al guardar el banner');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL de Imagen',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url?.substring(0, 50)}...
        </a>
      ),
    },
    {
      title: 'Orden',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 100,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
      width: 100,
      render: (active) => (
        <span style={{ color: active ? 'green' : 'red' }}>
          {active ? 'Sí' : 'No'}
        </span>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestión de Banners</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Nuevo Banner
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={banners}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingBanner ? 'Editar Banner' : 'Nuevo Banner'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ active: true, sortOrder: 1 }}
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Por favor ingrese el título' }]}
          >
            <Input placeholder="Título del banner" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="URL de Imagen"
            rules={[
              { required: true, message: 'Por favor ingrese la URL de la imagen' },
              { type: 'url', message: 'Por favor ingrese una URL válida' },
            ]}
          >
            <Input placeholder="https://ejemplo.com/imagen.jpg" />
          </Form.Item>

          <Form.Item
            name="sortOrder"
            label="Orden de visualización"
            rules={[{ required: true, message: 'Por favor ingrese el orden' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="active"
            label="Activo"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Banners;
