import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../api/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';
import { useDisconnect } from 'wagmi';
import { Layout, Menu, Button, Dropdown, Avatar, Space, message, Drawer } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
    const location = useLocation();
    const user = useSelector((state) => state.account.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { disconnect } = useDisconnect();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            key: '/',
            label: <Link to='/'>Trang chủ</Link>,
        },
        {
            key: '/newproduct',
            label: <Link to='/newproduct'>Nông sản mới</Link>,
        },
        {
            key: '/store',
            label: <Link to='/store'>Cửa hàng</Link>,
        },
        {
            key: '/about',
            label: <Link to='/about'>Giới thiệu</Link>,
        },
        {
            key: '/blog',
            label: <Link to='/blog'>Tin tức</Link>,
        },
        {
            key: '/contact',
            label: <Link to='/contact'>Liên hệ</Link>,
        },
    ];

    const handleLogout = async () => {
        const res = await callLogout();
        if (res) {
            disconnect();
            dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const userMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link to='/profile'>Hồ sơ cá nhân</Link>,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout,
        },
    ];

    return (
        <Layout>
            <Header 
                className="bg-white px-0 h-16 flex items-center" 
                style={{ 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    width: '100%',
                    padding: 0
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <i className="fas fa-leaf text-green-600 text-2xl mr-2"></i>
                                <span className="text-xl font-bold text-green-800">AgriTrace</span>
                            </div>
                            {/* Desktop Menu */}
                            <div className="hidden md:block ml-6">
                                <Menu
                                    mode="horizontal"
                                    selectedKeys={[location.pathname]}
                                    items={menuItems}
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        fontWeight: 500
                                    }}
                                    className="flex-1"
                                />
                            </div>
                        </div>

                        {/* Auth Buttons / User Actions */}
                        <div className="flex items-center">
                            {/* Mobile Menu Button */}
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden mr-2"
                                size="large"
                            />

                            {user.fullname ? (
                                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                                    <Button type="text" className="flex items-center">
                                        <Space>
                                            <Avatar
                                                style={{ backgroundColor: '#52c41a' }}
                                                icon={<UserOutlined />}
                                                size="small"
                                            />
                                            <span className="text-green-700 font-medium hidden sm:inline-block">
                                                {user.fullname}
                                            </span>
                                        </Space>
                                    </Button>
                                </Dropdown>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={() => navigate('/login')}
                                    style={{
                                        backgroundColor: '#52c41a',
                                        borderColor: '#52c41a'
                                    }}
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Header>
            <div style={{ paddingTop: '64px' }}></div>

            {/* Mobile menu drawer */}
            <Drawer
                title="Menu"
                placement="left"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                bodyStyle={{ padding: 0 }}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ border: 'none' }}
                />

                {user.fullname && (
                    <div className="px-4 py-4 border-t">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="text"
                                icon={<UserOutlined />}
                                onClick={() => {
                                    navigate('/profile');
                                    setMobileMenuOpen(false);
                                }}
                                block
                                className="text-left"
                            >
                                Hồ sơ cá nhân
                            </Button>
                            <Button
                                type="text"
                                danger
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                                block
                                className="text-left"
                            >
                                Đăng xuất
                            </Button>
                        </Space>
                    </div>
                )}
            </Drawer>
        </Layout>
    )
}

export default Navbar