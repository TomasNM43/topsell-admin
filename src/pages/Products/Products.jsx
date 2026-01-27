import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, Switch, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import brandService from '../../services/brandService';

const { TextArea } = Input;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      message.error('Error al cargar los productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await brandService.getAll();
      setBrands(data);
    } catch (error) {
      console.error('Error al cargar marcas:', error);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    const formData = {
      ...record,
      categoryId: record.category?.id,
      brandId: record.brand?.id,
    };
    form.setFieldsValue(formData);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este producto?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await productService.delete(id);
          message.success('Producto eliminado exitosamente');
          fetchProducts();
        } catch (error) {
          message.error('Error al eliminar el producto');
          console.error(error);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      // Construir el objeto producto según el formato del backend
      const productData = {
        name: values.name,
        slug: values.slug,
        longDescription: values.longDescription,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
        featured: values.featured || false,
        active: values.active !== undefined ? values.active : true,
        category: categories.find(c => c.id === values.categoryId),
        brand: brands.find(b => b.id === values.brandId),
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, productData);
        message.success('Producto actualizado exitosamente');
      } else {
        await productService.create(productData);
        message.success('Producto creado exitosamente');
      }
      setModalVisible(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      message.error('Error al guardar el producto');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price) => `$${price?.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
    },
    {
      title: 'Categoría',
      dataIndex: ['category', 'name'],
      key: 'category',
      width: 120,
    },
    {
      title: 'Marca',
      dataIndex: ['brand', 'name'],
      key: 'brand',
      width: 120,
    },
    {
      title: 'Destacado',
      dataIndex: 'featured',
      key: 'featured',
      width: 100,
      render: (featured) => (
        <span style={{ color: featured ? 'green' : 'gray' }}>
          {featured ? 'Sí' : 'No'}
        </span>
      ),
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
      width: 80,
      render: (active) => (
        <span style={{ color: active ? 'green' : 'red' }}>
          {active ? 'Sí' : 'No'}
        </span>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 120,
      fixed: 'right',
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
        <h2>Gestión de Productos</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Nuevo Producto
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ active: true, featured: false, stock: 0 }}
        >
          <Form.Item
            name="name"
            label="Nombre del Producto"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del producto' }]}
          >
            <Input placeholder="Nombre del producto" />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Por favor ingrese el slug' }]}
            extra="URL amigable (ej: camiseta-nike-running)"
          >
            <Input placeholder="camiseta-nike-running" />
          </Form.Item>

          <Form.Item
            name="longDescription"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
          >
            <TextArea rows={4} placeholder="Descripción detallada del producto" />
          </Form.Item>

          <Space style={{ width: '100%' }} size="large">
            <Form.Item
              name="price"
              label="Precio"
              rules={[{ required: true, message: 'Por favor ingrese el precio' }]}
              style={{ width: 200 }}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                prefix="$"
                placeholder="0.00"
              />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: 'Por favor ingrese el stock' }]}
              style={{ width: 150 }}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="0"
              />
            </Form.Item>
          </Space>

          <Form.Item
            name="imageUrl"
            label="URL de Imagen"
            rules={[
              { required: true, message: 'Por favor ingrese la URL de la imagen' },
              { type: 'url', message: 'Por favor ingrese una URL válida' },
            ]}
          >
            <Input placeholder="https://ejemplo.com/producto.jpg" />
          </Form.Item>

          <Space style={{ width: '100%' }} size="large">
            <Form.Item
              name="categoryId"
              label="Categoría"
              rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}
              style={{ width: 250 }}
            >
              <Select placeholder="Seleccionar categoría">
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="brandId"
              label="Marca"
              rules={[{ required: true, message: 'Por favor seleccione una marca' }]}
              style={{ width: 250 }}
            >
              <Select placeholder="Seleccionar marca">
                {brands.map((brand) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space size="large">
            <Form.Item
              name="featured"
              label="Producto Destacado"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="active"
              label="Activo"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
