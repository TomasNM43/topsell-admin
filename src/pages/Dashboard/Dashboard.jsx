import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, message } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  AppstoreAddOutlined,
  TagsOutlined,
  AppstoreOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import userService from '../../services/userService';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import brandService from '../../services/brandService';
import bannerService from '../../services/bannerService';
import quoteService from '../../services/quoteService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    brands: 0,
    banners: 0,
    quotes: 0,
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#3f8600', '#1890ff', '#cf1322', '#722ed1', '#eb2f96', '#fa8c16'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [users, products, categories, brands, banners, quotes] = await Promise.all([
        userService.getAll().catch(() => []),
        productService.getAll().catch(() => []),
        categoryService.getAll().catch(() => []),
        brandService.getAll().catch(() => []),
        bannerService.getAll().catch(() => []),
        quoteService.getAll().catch(() => []),
      ]);

      setStats({
        users: users.length,
        products: products.length,
        categories: categories.length,
        brands: brands.length,
        banners: banners.length,
        quotes: quotes.length,
      });
    } catch (error) {
      message.error('Error al cargar las estadísticas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Usuarios', value: stats.users },
    { name: 'Productos', value: stats.products },
    { name: 'Categorías', value: stats.categories },
    { name: 'Marcas', value: stats.brands },
    { name: 'Banners', value: stats.banners },
    { name: 'Cotizaciones', value: stats.quotes },
  ];

  return (
    <div style={{ fontSize: '16px' }}>
      <h2 style={{ marginBottom: 24, fontSize: '28px' }}>Dashboard</h2>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading}>
            <Statistic
              title="Total de Usuarios"
              value={stats.users}
              prefix={<UserOutlined style={{ fontSize: '24px' }} />}
              valueStyle={{ color: '#3f8600', fontSize: '32px' }}
              style={{ fontSize: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading}>
            <Statistic
              title="Total de Productos"
              value={stats.products}
              prefix={<ShoppingOutlined style={{ fontSize: '24px' }} />}
              valueStyle={{ color: '#1890ff', fontSize: '32px' }}
              style={{ fontSize: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading}>
            <Statistic
              title="Total de Categorías"
              value={stats.categories}
              prefix={<AppstoreAddOutlined style={{ fontSize: '24px' }} />}
              valueStyle={{ color: '#cf1322', fontSize: '32px' }}
              style={{ fontSize: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading}>
            <Statistic
              title="Total de Marcas"
              value={stats.brands}
              prefix={<TagsOutlined style={{ fontSize: '24px' }} />}
              valueStyle={{ color: '#722ed1', fontSize: '32px' }}
              style={{ fontSize: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading}>
            <Statistic
              title="Total de Banners"
              value={stats.banners}
              prefix={<AppstoreOutlined style={{ fontSize: '24px' }} />}
              valueStyle={{ color: '#eb2f96', fontSize: '32px' }}
              style={{ fontSize: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card loading={loading}>
            <Statistic
              title="Total de Cotizaciones"
              value={stats.quotes}
              prefix={<FileTextOutlined style={{ fontSize: '24px' }} />}
              valueStyle={{ color: '#fa8c16', fontSize: '32px' }}
              style={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Resumen por Módulos" loading={loading} headStyle={{ fontSize: '18px' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1890ff" name="Cantidad">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Distribución de Entidades" loading={loading} headStyle={{ fontSize: '18px' }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
