import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import userService from '../../services/userService';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      message.error('Error al cargar los usuarios');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      phone: record.phone,
      role: record.role,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este usuario?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await userService.delete(id);
          message.success('Usuario eliminado exitosamente');
          fetchUsers();
        } catch (error) {
          message.error('Error al eliminar el usuario');
          console.error(error);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        // Actualizar usuario existente
        await userService.update(editingUser.id, values);
        message.success('Usuario actualizado exitosamente');
      } else {
        // Crear nuevo usuario
        await userService.create(values);
        message.success('Usuario creado exitosamente');
      }
      setModalVisible(false);
      form.resetFields();
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      message.error(editingUser ? 'Error al actualizar el usuario' : 'Error al crear el usuario');
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
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <span style={{ 
          color: role === 'ADMIN' ? '#1890ff' : '#52c41a',
          fontWeight: 500 
        }}>
          {role}
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
        <h2>Gestión de Usuarios</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Crear Usuario
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingUser ? "Editar Usuario" : "Crear Usuario"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="firstName"
            label="Nombre"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre' },
            ]}
          >
            <Input placeholder="Nombre del usuario" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Apellido"
            rules={[
              { required: true, message: 'Por favor ingrese el apellido' },
            ]}
          >
            <Input placeholder="Apellido del usuario" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor ingrese el email' },
              { type: 'email', message: 'Por favor ingrese un email válido' },
            ]}
          >
            <Input placeholder="Email del usuario" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: 'Por favor ingrese la contraseña' },
                { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
              ]}
            >
              <Input.Password placeholder="Contraseña del usuario" />
            </Form.Item>
          )}

          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[
              { required: true, message: 'Por favor ingrese el teléfono' },
            ]}
          >
            <Input placeholder="Teléfono del usuario" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Rol"
            rules={[
              { required: true, message: 'Por favor seleccione el rol' },
            ]}
          >
            <Select placeholder="Seleccione un rol">
              <Option value="USER">USER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
