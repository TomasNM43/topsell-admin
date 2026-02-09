import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Tag, Descriptions } from 'antd';
import { EyeOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import contactService from '../../services/contactService';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAll();
      setContacts(data);
    } catch (error) {
      message.error('Error al cargar los mensajes de contacto');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (record) => {
    setSelectedContact(record);
    setModalVisible(true);
    
    // Marcar como leído si no lo está
    if (!record.leido) {
      handleMarkAsRead(record.id);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactService.markAsRead(id);
      fetchContacts();
    } catch (error) {
      console.error('Error al marcar como leído:', error);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este mensaje?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await contactService.delete(id);
          message.success('Mensaje eliminado exitosamente');
          fetchContacts();
        } catch (error) {
          message.error('Error al eliminar el mensaje');
          console.error(error);
        }
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Estado',
      dataIndex: 'leido',
      key: 'leido',
      width: 100,
      render: (leido) => (
        <Tag color={leido ? 'green' : 'orange'}>
          {leido ? 'Leído' : 'Nuevo'}
        </Tag>
      ),
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      width: 150,
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      width: 150,
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      width: 200,
    },
    {
      title: 'DNI/RUC',
      dataIndex: 'dniOrRuc',
      key: 'dniOrRuc',
      width: 120,
    },
    {
      title: 'Razón Social',
      dataIndex: 'razonSocial',
      key: 'razonSocial',
      width: 180,
      render: (text) => text || '-',
    },
    {
      title: 'Fecha',
      dataIndex: 'fechaCreacion',
      key: 'fechaCreacion',
      width: 180,
      render: (date) => new Date(date).toLocaleString('es-PE'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            size="small"
          >
            Ver
          </Button>
          {!record.leido && (
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleMarkAsRead(record.id)}
              size="small"
            >
              Marcar leído
            </Button>
          )}
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
        <h2>Mensajes de Contacto</h2>
      </div>

      <Table
        columns={columns}
        dataSource={contacts}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1300 }}
      />

      <Modal
        title="Detalle del Mensaje"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedContact(null);
        }}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Cerrar
          </Button>,
          <Button
            key="delete"
            danger
            onClick={() => {
              handleDelete(selectedContact.id);
              setModalVisible(false);
            }}
          >
            Eliminar
          </Button>,
        ]}
        width={700}
      >
        {selectedContact && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Estado">
              <Tag color={selectedContact.leido ? 'green' : 'orange'}>
                {selectedContact.leido ? 'Leído' : 'Nuevo'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Nombres">{selectedContact.nombres}</Descriptions.Item>
            <Descriptions.Item label="Apellidos">{selectedContact.apellidos}</Descriptions.Item>
            <Descriptions.Item label="Correo Electrónico">{selectedContact.correo}</Descriptions.Item>
            <Descriptions.Item label="DNI/RUC">{selectedContact.dniOrRuc}</Descriptions.Item>
            <Descriptions.Item label="Razón Social">
              {selectedContact.razonSocial || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Fecha de Envío">
              {new Date(selectedContact.fechaCreacion).toLocaleString('es-PE')}
            </Descriptions.Item>
            <Descriptions.Item label="Mensaje">
              <div style={{ whiteSpace: 'pre-wrap' }}>{selectedContact.mensaje}</div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Contacts;
