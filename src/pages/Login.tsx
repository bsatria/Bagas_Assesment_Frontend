// src/pages/Login.tsx
import { Form, Input, Button, message, Row, Col, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { login } from '../api/auth';
import { LoginOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set('token', data.data.token);
      Cookies.set('nama', data.data.nama_lengkap);
      Cookies.set('username', data.data.username);
      Cookies.set('id_user', JSON.stringify(data.data.id_user));
      navigate('/');
      message.success('Login successful');
    },
    onError: () => {
      message.error('Login failed');
    },
  });

  const onFinish = (values: { username: string; password: string }) => {
    loginMutation.mutate(values);
  };

  return (
    <Row 
      justify="center" 
      align="middle" 
      style={{ 
        minHeight: '100vh',
        background: '#f0f2f5'
      }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card bordered={false} style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2}>
              <LoginOutlined style={{ marginRight: 8 }} />
              Login
            </Title>
          </div>
          
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { 
                  required: true, 
                  message: 'Please input your username!' 
                }
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { 
                  required: true, 
                  message: 'Please input your password!' 
                }
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loginMutation.isPending}
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;