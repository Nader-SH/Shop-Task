import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Pagination, Row, Col, Button } from 'antd';
import axios from 'axios';
import './products.css'; // Import the CSS file

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
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const fetchProducts = async (currentPage: number, category: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`/products?page=${currentPage}&category=${category}`);
            const { rows: newProducts = [], count: total } = response.data.data;
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
        fetchProducts(page, selectedCategory);
    }, [page, selectedCategory]);

    const handlePaginationChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setPage(1); // Reset to the first page when changing categories
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>

            {/* Title and Description */}
            <div className="products-header">
                <h1>
                    MAN CLOTHING COLLECTION
                </h1>
                <p>
                    Explore our exclusive collection of men’s clothing designed to elevate your style.
                    From casual wear to formal attire, find everything you need to look sharp and stay comfortable.
                </p>
            </div>
            
            {/* Category Filter Buttons */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Button
                    type={selectedCategory === 'casual' ? 'primary' : 'default'}
                    onClick={() => handleCategoryChange('casual')}
                    style={{
                        margin: '0 10px',
                        backgroundColor: selectedCategory === 'casual' ? '#1e293b' : '#f0f0f0',
                        color: selectedCategory === 'casual' ? '#fff' : '#1e293b',
                    }}
                >
                    Casual
                </Button>
                <Button
                    type={selectedCategory === 'formal' ? 'primary' : 'default'}
                    onClick={() => handleCategoryChange('formal')}
                    style={{
                        margin: '0 10px',
                        backgroundColor: selectedCategory === 'formal' ? '#1e293b' : '#f0f0f0',
                        color: selectedCategory === 'formal' ? '#fff' : '#1e293b',
                    }}
                >
                    Formal
                </Button>
                <Button
                    type={selectedCategory === 'sportswear' ? 'primary' : 'default'}
                    onClick={() => handleCategoryChange('sportswear')}
                    style={{
                        margin: '0 10px',
                        backgroundColor: selectedCategory === 'sportswear' ? '#1e293b' : '#f0f0f0',
                        color: selectedCategory === 'sportswear' ? '#fff' : '#1e293b',
                    }}
                >
                    Sportswear
                </Button>
            </div>

            {/* Products */}
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
                                                height: 250,
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

            {/* Loading Spinner */}
            {loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Spin size="large" />
                </div>
            )}

            {/* Pagination */}
            {!loading && total > 0 && (
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={8}
                        onChange={handlePaginationChange}
                        style={{ textAlign: 'center', marginTop: 20 }}
                    />
                </div>
            )}
        </div>
    );
};

export default Products;
