/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Pagination, Row, Col } from 'antd';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const fetchProducts = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`/products?page=${currentPage}`);
            console.log(response, "API Response");

            const { rows: newProducts = [], count : total   } = response.data.data;
            console.log("New Products: ", newProducts);

            setProducts(newProducts);
            setTotal(total - 1);
        } catch (error: any) {
            console.error(error);
            message.error('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const handlePaginationChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Products</h1>
            {products.length === 0 && !loading ? (
                <Card style={{ textAlign: 'center', padding: '20px' }}>
                    No Data Yet
                </Card>
            ) : (
                <Row gutter={[16, 16]} justify="start">
                    {products.map((product) => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    product.image ? (
                                        <img
                                            alt={product.name}
                                            src={product.image}
                                            style={{
                                                height: 200,
                                                objectFit: 'cover',
                                                borderTopLeftRadius: '4px',
                                                borderTopRightRadius: '4px',
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                height: 200,
                                                background: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderTopLeftRadius: '4px',
                                                borderTopRightRadius: '4px',
                                            }}
                                        >
                                            No Image
                                        </div>
                                    )
                                }
                            >
                                <Card.Meta
                                    title={product.name}
                                    description={product.description}
                                />
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                                    ${Number(product.price).toFixed(2)}  {/* Ensure price is a number */}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            {loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Spin size="large" />
                </div>
            )}
            {/* Pagination */}
            {!loading && total > 0 && (
                <Pagination
                    current={page}
                    total={total}
                    pageSize={8}
                    onChange={handlePaginationChange}
                    style={{ textAlign: 'center', marginTop: 20 }}
                />
            )}
        </div>
    );
};

export default Products;
