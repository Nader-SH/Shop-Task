import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Pagination, Row, Col, Button } from 'antd';
import axios from 'axios';
import './products.css';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
    type: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // Selected category for filtering
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products based on selected category

    // Fetch all products (no category filter from the API)
    const fetchProducts = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await axios.get('/products', { params: { page: currentPage } });
            const { rows: newProducts = [], count: total } = response.data.data;
            setProducts(newProducts);
            setTotal(total);
        } catch (error: any) {
            console.error(error);
            message.error('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Filter products based on the selected category
    const filterProducts = (category: string) => {
        if (category === '') {
            setFilteredProducts(products); // Show all products if no category is selected
        } else {
            const filtered = products.filter((product) => product.type === category);
            setFilteredProducts(filtered);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    useEffect(() => {
        filterProducts(selectedCategory); // Filter products whenever category changes
    }, [selectedCategory, products]);

    const handlePaginationChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setPage(1); // Reset to the first page when changing categories
    };

    // Category labels for filtering
    const categories = [
        { key: 'T-Shirts', label: 'T-Shirts' },
        { key: 'Shirts', label: 'Shirts' },
        { key: 'Pants', label: 'Pants' },
        { key: 'Jeans', label: 'Jeans' },
        { key: 'Shorts', label: 'Shorts' },
        { key: 'Suits', label: 'Suits' },
        { key: 'Jackets', label: 'Jackets' },
        { key: 'Sweaters', label: 'Sweaters' },
        { key: 'Sportswear', label: 'Sportswear' },
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>

            {/* Title and Description */}
            <div className="products-header">
                <h1>MAN CLOTHING COLLECTION</h1>
                <p>
                    Explore our exclusive collection of men’s clothing designed to elevate your style.
                    From casual wear to formal attire, find everything you need to look sharp and stay comfortable.
                </p>
            </div>

            {/* Filter Buttons */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Button
                    key="all"
                    type={selectedCategory === '' ? 'primary' : 'default'}
                    onClick={() => handleCategoryChange('')}
                    style={{
                        margin: '0 10px',
                        backgroundColor: selectedCategory === '' ? '#1e293b' : '#f0f0f0',
                        color: selectedCategory === '' ? '#fff' : '#1e293b',
                    }}
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.key}
                        type={selectedCategory === category.key ? 'primary' : 'default'}
                        onClick={() => handleCategoryChange(category.key)}
                        style={{
                            margin: '0 10px',
                            backgroundColor: selectedCategory === category.key ? '#1e293b' : '#f0f0f0',
                            color: selectedCategory === category.key ? '#fff' : '#1e293b',
                        }}
                    >
                        {category.label}
                    </Button>
                ))}
            </div>

            {/* Products */}
            {filteredProducts.length === 0 && !loading ? (
                <Card style={{ textAlign: 'center', padding: '20px' }}>
                    No Data Yet
                </Card>
            ) : (
                <Row gutter={[16, 16]} justify="start">
                    {filteredProducts.map((product) => (
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
                                    ${Number(product.price).toFixed(2)}
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
