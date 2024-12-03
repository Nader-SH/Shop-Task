import React from 'react';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

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
        <Card
            style={{
                width: '100%',
                maxWidth: 1200,
                margin: '100px auto',
                padding: 0,
                overflow: 'hidden',
                borderRadius: 10,
            }}
        >
            <Row justify="center" className="formRow">
                {/* Left Side (Image/Text) */}
                <Col
                    xs={0} sm={8} md={10} lg={10} xl={10}
                    className="sideForm"
                >
                    <div className="imageOverlay">
                        <div className="textOverlay">
                            <h1>Welcome Back!</h1>
                            <p>Login to your account and continue enjoying our services.</p>
                        </div>
                    </div>
                </Col>

                {/* Right Side (Form) */}
                <Col xs={24} sm={16} md={14} lg={12} xl={14} className='form'>
                    <div style={{ marginBottom: '20px' }}>
                        <h1 style={{ textAlign: 'center' }}>Login</h1>
                    </div>
                    <Form name="login" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" style={{ padding: '20px' }}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button className="loginButton" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default Login;
