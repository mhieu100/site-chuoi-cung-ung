import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button, Layout, Typography } from 'antd';
import { QuestionCircleOutlined, HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NotFound = () => {
    const navigate = useNavigate();
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Result
                    status="404"
                    icon={<QuestionCircleOutlined style={{ color: '#1890ff' }} />}
                    title={
                        <Title level={2} style={{ color: '#1890ff' }}>
                            Trang không tìm thấy
                        </Title>
                    }
                    subTitle={
                        <Paragraph style={{ fontSize: 16 }}>
                            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                        </Paragraph>
                    }
                    extra={
                        <Button 
                            type="primary" 
                            icon={<HomeOutlined />}
                            onClick={() => navigate('/')}
                        >
                            Trở về trang chủ
                        </Button>
                    }
                />
            </Content>
        </Layout>
    );
};

export default NotFound;