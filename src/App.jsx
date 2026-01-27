import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import AdminLayout from './layouts/AdminLayout';
import Banners from './pages/Banners/Banners';
import Brands from './pages/Brands/Brands';
import Categories from './pages/Categories/Categories';
import Products from './pages/Products/Products';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/banners" replace />} />
            <Route path="banners" element={<Banners />} />
            <Route path="brands" element={<Brands />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
