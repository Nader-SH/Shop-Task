import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message, Card } from 'antd';
import axios from 'axios';

const AddProduct: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: { name: string; description: string; price: number; image: string; count: number }) => {
        setLoading(true);
        try {
            // Send the product data to the API
            await axios.post('/addproduct', values);
            message.success('Product added successfully!');
        } catch (error: any) {
            console.error(error);
            message.error('Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Add New Product" style={{ maxWidth: 600, margin: '50px auto' }}>
            <Form name="add-product" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the product description!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the product price!' }]}
                >
                    <InputNumber
                        min={0}
                        step={0.01}
                        style={{ width: '100%' }}
                        formatter={(value) => `$ ${value}`}
                        parser={(value: string | undefined) => Number(value?.replace(/\$\s?|(,*)/g, ''))}
                    />
                </Form.Item>

                <Form.Item
                    label="Count"
                    name="count"
                    rules={[{ required: true, message: 'Please input the product count!' }]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        placeholder="Enter product quantity"
                    />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="image"
                    rules={[
                        { required: true, message: 'Please input the image URL!' },
                        { type: 'url', message: 'Please enter a valid URL!' },
                    ]}
                >
                    <Input placeholder="https://example.com/image.jpg" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddProduct;
