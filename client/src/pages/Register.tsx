import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: { name: string; email: string; password: string }) => {
        try {
            // Send the registration data (name, email, password)
            await axios.post('/registration', values);

            message.success('Registration successful! Redirecting to login...');
            navigate('/login');
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <Card title="Register" style={{ width: 400, margin: '100px auto' }}>
            <Form name="register" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Register;
