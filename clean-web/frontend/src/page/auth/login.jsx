import React, { useEffect } from 'react'
import './auth.css'
import { ConnectButton, Connector } from '@ant-design/web3'
import { EthereumCircleColorful } from '@ant-design/web3-icons'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { Typography, Layout, Card, Space, Divider, message } from 'antd'
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'
import { callLogin } from '../../api/api.auth'
import { setUserLoginInfo } from '../../redux/slice/accountSlide'

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useAccount();
  
  // Get the path to redirect to after login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (address) {
      handleLogin();
    }
  }, [address]);

  const handleLogin = async () => {
    try {
      const res = await callLogin(address);
      if (!res.statusCode) {
        // Set user info in state
        dispatch(setUserLoginInfo(res));
        
        // Single success message
        message.success('Đăng nhập thành công!');
        
        // Role-based redirection
        if (res.role === 'INSPECTOR') {
          navigate('/inspection/dashboard');
        } else if (res.role === 'TRANSPORTER') {
          navigate('/logistics-portal/');
        } else {
          // Default for FARMER or other roles
          navigate(from, { replace: true });
        }
      } else {
        // If not registered, redirect to register
        navigate('/register');
      }
    } catch (error) {
      // Single error message for server errors
      message.error('Không thể kết nối tới máy chủ. Vui lòng thử lại sau.');
      console.error('Login error:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
        <Card 
          bordered={false} 
          style={{ 
            width: '100%', 
            maxWidth: 1000, 
            boxShadow: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
            borderRadius: 8,
            overflow: 'hidden',
            padding: 0
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            {/* Left sidebar - visible on medium screens and larger */}
            <div 
              className="login-bg" 
              style={{ 
                width: '50%', 
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white'
              }}
            >
              <div>
                <Space align="center" size={12}>
                  <LinkedinOutlined style={{ fontSize: 24 }} />
                  <Title level={3} style={{ margin: 0, color: 'white' }}>AgriTrace</Title>
                </Space>
              </div>
              
              <div>
                <Title level={2} style={{ color: 'white', marginBottom: 16 }}>
                  Ứng dụng Blockchain trong chuỗi cung ứng nông sản sạch
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Giải pháp minh bạch và bảo mật cho toàn bộ chuỗi cung ứng từ trang trại đến bàn ăn
                </Paragraph>
              </div>
              
              <Space size={16}>
                <a href="#" style={{ color: 'white' }}><FacebookOutlined style={{ fontSize: 20 }} /></a>
                <a href="#" style={{ color: 'white' }}><TwitterOutlined style={{ fontSize: 20 }} /></a>
                <a href="#" style={{ color: 'white' }}><LinkedinOutlined style={{ fontSize: 20 }} /></a>
              </Space>
            </div>
            
            {/* Right content */}
            <div style={{ width: '50%', padding: 48 }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2} style={{ marginBottom: 8 }}>
                  Đăng nhập hệ thống
                </Title>
                <Paragraph type="secondary">
                  Sử dụng blockchain ID của bạn để truy cập
                </Paragraph>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <EthereumCircleColorful style={{ fontSize: '64px' }} />
                  </div>
                  
                  <Divider plain>
                    <Text type="secondary">Kết nối ví của bạn</Text>
                  </Divider>
                  
                  <Connector>
                    <ConnectButton
                      style={{
                        width: '100%',
                        height: 48,
                        fontSize: 16,
                        borderRadius: 8,
                        marginTop: 16
                      }}
                    />
                  </Connector>
                </Space>
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  )
}

export default LoginPage