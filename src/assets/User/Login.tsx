import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import { useAuthenticateLogin } from '../../HandleApi/Api';


const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: authenticateLogin, error } = useAuthenticateLogin();
  const navigate = useNavigate();

  const onFinish = () => {
    authenticateLogin(
      { username, password },
      {
        onSuccess: (data) => {
          // Assuming 'data' contains the user role
          if (data.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/user');
          }
        },
        onError: () => {
          alert('Invalid username or password');
        }
      }
    );
  };

  if (error) return <p>Error authenticating user!</p>;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f0f2f5' // Optional background color
    }}>
      <Card title={<h2 style={{fontFamily: 'cursive'}}>LOGIN</h2> } bordered={false} style={{ width: 400 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="/changePassword">Reset Password</a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;