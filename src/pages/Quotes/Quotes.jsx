import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Descriptions, Tag, message } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import quoteService from '../../services/quoteService';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const data = await quoteService.getAll();
      setQuotes(data);
    } catch (error) {
      message.error('Error al cargar las cotizaciones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (record) => {
    try {
      const data = await quoteService.getById(record.id);
      setSelectedQuote(data);
      setDetailsVisible(true);
    } catch (error) {
      message.error('Error al cargar los detalles de la cotización');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar esta cotización?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await quoteService.delete(id);
          message.success('Cotización eliminada exitosamente');
          fetchQuotes();
        } catch (error) {
          message.error('Error al eliminar la cotización');
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
      width: 80,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    },
    {
      title: 'Cliente',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: 'Productos',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <Tag color="blue">{items.length} {items.length === 1 ? 'producto' : 'productos'}</Tag>
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
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
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

  const itemColumns = [
    {
      title: 'Producto',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
    },
    {
      title: 'Precio Unitario',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price) => `$${price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (subtotal) => `$${subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2>Gestión de Cotizaciones</h2>
      </div>

      <Table
        columns={columns}
        dataSource={quotes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Detalles de la Cotización"
        open={detailsVisible}
        onCancel={() => {
          setDetailsVisible(false);
          setSelectedQuote(null);
        }}
        footer={[
          <Button key="close" onClick={() => setDetailsVisible(false)}>
            Cerrar
          </Button>,
        ]}
        width={800}
      >
        {selectedQuote && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="ID">{selectedQuote.id}</Descriptions.Item>
              <Descriptions.Item label="Fecha">
                {new Date(selectedQuote.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Descriptions.Item>
              <Descriptions.Item label="Cliente">{selectedQuote.userName}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedQuote.userEmail}</Descriptions.Item>
              <Descriptions.Item label="Total" span={2}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#E6332A' }}>
                  ${selectedQuote.totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <h3>Productos</h3>
              <Table
                columns={itemColumns}
                dataSource={selectedQuote.items}
                rowKey="id"
                pagination={false}
                size="small"
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Quotes;
