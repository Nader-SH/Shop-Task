import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './ContactUs.css'; // You can add custom styles here if you want

const ContactUs: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Simulate sending the message to the backend
            console.log('Message sent:', values);
            message.success('Thank you for reaching out! We will get back to you soon.');
            // Optionally clear the form here
        } catch (error) {
            message.error('Failed to send the message. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="contact-us-container">
            <h1 className="contact-us-title">Contact Us</h1>
            <Form
                name="contact_us"
                onFinish={onFinish}
                layout="vertical"
                className="contact-us-form"
            >
                <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Your Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Message"
                    name="message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter your message" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="contact-us-submit-button"
                    >
                        Send Message
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ContactUs;
