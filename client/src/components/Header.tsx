import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, message, Drawer } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header } = Layout;

// Define the type for the props
interface AppHeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
    const [user, setUser] = useState<any>(null);
    const [visible, setVisible] = useState(true);
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

    // Handle the Drawer visibility for mobile
    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);

    return (
        <Header style={{ padding: '0 20px', backgroundColor: '#fff' }}>
            <div className="logo" style={{ float: 'left' }}>
                <h2>MyApp</h2>
            </div>
            <Button
                type="primary"
                onClick={showDrawer}
                style={{ display: 'block', marginTop: '10px', float: 'right', zIndex: 1 }}
            >
                Menu
            </Button>

            <Drawer
                title="Menu"
                placement="right"
                closable
                onClose={onClose}
                visible={visible}
                width={250}
            >
                <Menu mode="inline" theme="light">
                    {isAuthenticated ? (
                        <>
                            <Menu.Item key="1">
                                <Link to="/">Products</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/add-product">Add Product</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Button onClick={handleLogout} type="primary" block>
                                    Logout
                                </Button>
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="4">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/register">Register</Link>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Drawer>
        </Header>
    );
};

export default AppHeader;
