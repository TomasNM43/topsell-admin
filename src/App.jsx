import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Banners from './pages/Banners/Banners';
import Brands from './pages/Brands/Brands';
import Categories from './pages/Categories/Categories';
import Products from './pages/Products/Products';
import Users from './pages/Users/Users';
import Quotes from './pages/Quotes/Quotes';
import Contacts from './pages/Contacts/Contacts';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="banners" element={<Banners />} />
              <Route path="brands" element={<Brands />} />
              <Route path="categories" element={<Categories />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="quotes" element={<Quotes />} />
              <Route path="contacts" element={<Contacts />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
