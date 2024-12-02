import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const response = await axios.post('/login', values);
            const { user } = response.data;
            
            localStorage.setItem('user', JSON.stringify(user));

            login(user);
            navigate('/');
            message.success('Login successful!');
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.msg || 'Login failed. Please try again.');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title="Login" style={{ width: 400, margin: '100px auto' }}>
            <Form
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
