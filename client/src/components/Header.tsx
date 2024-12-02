import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input, Button, message, Drawer } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import axios from 'axios';
import './AppHeader.css'; // Import the updated CSS file

const { Header } = Layout;
const { Search } = Input;

interface AppHeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
    const [user, setUser] = useState<any>(null);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser === "undefined") {
            navigate('/login');
            setIsAuthenticated(false);
            return;
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, [navigate, setIsAuthenticated]);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            message.success('Logout successful!');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.msg || 'Logout failed. Please try again.');
        }
    };

    const onSearch = (value: string) => {
        console.log('Search query:', value);
        // Handle search functionality
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    return (
        <Header className="header">
            {/* Mobile menu - Hamburger Icon */}
            <div className="mobile-menu">
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                    className="menu-icon"
                />
            </div>

            {/* Desktop Header (visible on larger screens) */}
            <div className="desktop-header">
                <Menu mode="horizontal" theme="dark" className="left-menu">
                    <Menu.Item key="1">
                        <Link to="/about">About</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/contact-us">Contact Us</Link>
                    </Menu.Item>
                    {isAuthenticated && (
                        <Menu.Item key="3">
                            <Link to="/">Products</Link>
                        </Menu.Item>
                    )}
                    {isAuthenticated && (
                        <Menu.Item key="4">
                            <Link to="/add-product">Add Products</Link>
                        </Menu.Item>
                    )}
                </Menu>

                {/* Search bar */}
                <Search
                    placeholder="Search products"
                    onSearch={onSearch}
                    enterButton
                    className="search-bar"
                />

                {/* Right actions */}
                <div className="header-actions">
                    {isAuthenticated && user && (
                        <div className="user-welcome">{user.name}</div>
                    )}
                    <Button
                        type="text"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => navigate('/cart')}
                        className="cart-icon"
                    />
                    {isAuthenticated ? (
                        <Button type="primary" onClick={handleLogout} className="logout-button">
                            Logout
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={() => navigate('/login')}
                            className="login-button"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>

            {/* Drawer Sidebar for Mobile */}
            <Drawer
                title="Menu"
                placement="left"
                onClose={closeDrawer}
                visible={visible}
                className="drawer"
            >
                <Menu mode="vertical" className='mobileTabs'>
                    <Menu.Item key="1">
                        <Link to="/about">About</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/contact-us">Contact Us</Link>
                    </Menu.Item>
                    {isAuthenticated && (
                        <Menu.Item key="3">
                            <Link to="/">Products</Link>
                        </Menu.Item>
                    )}
                    {isAuthenticated && (
                        <Menu.Item key="4">
                            <Link to="/add-product">Add Products</Link>
                        </Menu.Item>
                    )}
                    {isAuthenticated ? (
                        <Menu.Item key="5">
                            <Button type="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Menu.Item>
                    ) : (
                        <Menu.Item key="6">
                            <Button type="primary" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                        </Menu.Item>
                    )}
                </Menu>
            </Drawer>
        </Header>
    );
};

export default AppHeader;
