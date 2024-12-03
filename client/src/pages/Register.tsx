import React from 'react';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

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
        <Card
            style={{
                width: '100%',
                maxWidth: 1200,
                margin: '100px auto',
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <Row justify="center" className="formRow">
                {/* Left Side (Image/Text) */}
                <Col
                    xs={0} sm={0} md={10} lg={10} xl={10}
                    className="sideForm"
                >
                    <div className="imageOverlay">
                        <div className="textOverlay">
                            <h1>Welcome!</h1>
                            <br />
                            <p>Join us and enjoy all the features we have to offer.</p>
                        </div>
                    </div>
                </Col>

                {/* Right Side (Form) */}
                <Col xs={24} sm={12} md={14} lg={12} xl={14} className='form'>
                    <div style={{ marginBottom: '20px' }}>
                        <h1 style={{ textAlign: 'center' }}>Register</h1>
                    </div>
                    <Form name="register" onFinish={onFinish} layout="vertical" style={{ padding: '20px' }}>
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
                            <Button className="registerButton" htmlType="submit" block>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default Register;
