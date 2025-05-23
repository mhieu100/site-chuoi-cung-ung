import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Result, Button, Layout, Typography, Space, Divider } from 'antd';
import { StopOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

const ForbiddenPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.account);
    
    const attemptedPath = location.state?.attemptedPath || "khu vực hạn chế";
    
    // Determine what role is required based on the path
    const getRequiredRole = (path) => {
        if (path.includes('/inspection')) {
            return 'Thanh tra viên (INSPECTOR)';
        } else if (path.includes('/logistics-portal')) {
            return 'Vận chuyển (TRANSPORTER)';
        }
        return 'cấp cao hơn';
    };
    
    const requiredRole = getRequiredRole(attemptedPath);
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Result
                    status="403"
                    icon={<LockOutlined style={{ color: '#ff4d4f' }} />}
                    title={
                        <Title level={2} style={{ color: '#ff4d4f' }}>
                            Truy cập bị từ chối
                        </Title>
                    }
                    subTitle={
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <Paragraph style={{ fontSize: 16 }}>
                                Bạn không có quyền truy cập vào khu vực này.
                            </Paragraph>
                            
                            <Divider style={{ margin: '12px 0' }} />
                            
                            {user?.role && (
                                <Paragraph>
                                    <Text strong>Vai trò hiện tại:</Text> {user.role}
                                </Paragraph>
                            )}
                            
                            <Paragraph>
                                <Text strong>Khu vực yêu cầu truy cập:</Text> {attemptedPath}
                            </Paragraph>
                            
                            <Paragraph>
                                <Text strong>Yêu cầu vai trò:</Text> {requiredRole}
                            </Paragraph>
                        </Space>
                    }
                    extra={
                        <Space>
                            <Button 
                                type="primary" 
                                icon={<HomeOutlined />}
                                onClick={() => navigate('/')}
                            >
                                Trở về trang chủ
                            </Button>
                            {location.state?.from && (
                                <Button 
                                    onClick={() => navigate(-1)}
                                >
                                    Quay lại
                                </Button>
                            )}
                        </Space>
                    }
                />
            </Content>
        </Layout>
    );
};

export default ForbiddenPage; 