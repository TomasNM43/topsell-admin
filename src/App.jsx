import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Banners from './pages/Banners/Banners';
import Brands from './pages/Brands/Brands';
import Categories from './pages/Categories/Categories';
import Products from './pages/Products/Products';
import Users from './pages/Users/Users';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="banners" element={<Banners />} />
            <Route path="brands" element={<Brands />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
