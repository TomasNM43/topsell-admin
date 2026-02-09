import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, ShopOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        message.success('¡Bienvenido al panel de administración!');
        navigate('/dashboard');
      } else {
        message.error(result.message || 'Credenciales incorrectas');
      }
    } catch {
      message.error('Error al iniciar sesión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <img 
            src="/logotipo.png" 
            alt="TopSell" 
            className="login-logo"
          />
          <h1 className="login-title">Panel de Administración</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>
        </div>

        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor ingresa tu email' },
              { type: 'email', message: 'Por favor ingresa un email válido' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor ingresa tu contraseña' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          © 2026 TopSell. Todos los derechos reservados.
        </div>
      </Card>
    </div>
  );
};

export default Login;
