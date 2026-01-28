import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined,
  AppstoreOutlined, 
  TagsOutlined, 
  AppstoreAddOutlined,
  ShoppingOutlined,
  UserOutlined
} from '@ant-design/icons';
import './AdminLayout.css';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined style={{ fontSize: '18px' }} />,
      label: <Link to="/dashboard" style={{ fontSize: '20px' }}>Dashboard</Link>,
    },
    {
      key: '/banners',
      icon: <AppstoreOutlined style={{ fontSize: '18px' }} />,
      label: <Link to="/banners" style={{ fontSize: '20px' }}>Banners</Link>,
    },
    {
      key: '/brands',
      icon: <TagsOutlined style={{ fontSize: '18px' }} />,
      label: <Link to="/brands" style={{ fontSize: '20px' }}>Marcas</Link>,
    },
    {
      key: '/categories',
      icon: <AppstoreAddOutlined style={{ fontSize: '18px' }} />,
      label: <Link to="/categories" style={{ fontSize: '20px' }}>Categorías</Link>,
    },
    {
      key: '/products',
      icon: <ShoppingOutlined style={{ fontSize: '18px' }} />,
      label: <Link to="/products" style={{ fontSize: '20px' }}>Productos</Link>,
    },
    {
      key: '/users',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      label: <Link to="/users" style={{ fontSize: '20px' }}>Usuarios</Link>,
    },
  ];

  const selectedKey = menuItems.find(item => location.pathname.startsWith(item.key))?.key || '/dashboard';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={280}
        style={{
          background: '#F8F9FA',
        }}
      >
        <div className="logo">
          <img 
            src="/logotipo.png" 
            alt="TopSell Admin" 
            style={{ 
              maxWidth: '90%', 
              maxHeight: '60px',
              width: 'auto',
              height: 'auto', 
              objectFit: 'contain'
            }} 
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ fontSize: '20px', background: '#F8F9FA', border: 'none' }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>
            Panel de Administración
          </h1>
        </Header>
        <Content style={{ margin: '24px 20px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
