import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { 
  AppstoreOutlined, 
  TagsOutlined, 
  AppstoreAddOutlined,
  ShoppingOutlined 
} from '@ant-design/icons';
import './AdminLayout.css';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/banners',
      icon: <AppstoreOutlined />,
      label: <Link to="/banners">Banners</Link>,
    },
    {
      key: '/brands',
      icon: <TagsOutlined />,
      label: <Link to="/brands">Marcas</Link>,
    },
    {
      key: '/categories',
      icon: <AppstoreAddOutlined />,
      label: <Link to="/categories">Categorías</Link>,
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: <Link to="/products">Productos</Link>,
    },
  ];

  const selectedKey = menuItems.find(item => location.pathname.startsWith(item.key))?.key || '/banners';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: '#001529',
        }}
      >
        <div className="logo">
          <h2 style={{ color: 'white', textAlign: 'center', padding: '16px 0' }}>
            TopSell Admin
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>
            Panel de Administración
          </h1>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
