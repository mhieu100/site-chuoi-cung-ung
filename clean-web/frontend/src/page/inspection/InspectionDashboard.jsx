import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  PageContainer,
  ProCard,
  StatisticCard
} from '@ant-design/pro-components';
import {
  Row,
  Col,
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Progress,
  Empty,
  Spin,
  Card,
  Avatar,
  List
} from 'antd';
import {
  SafetyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  RiseOutlined,
  LineChartOutlined,
  PieChartOutlined,
  EyeOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Statistic } = StatisticCard;

const InspectionDashboard = () => {
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulated data
  const [stats, setStats] = useState({
    pendingInspections: 15,
    completedInspections: 67,
    certifiedProducts: 54,
    rejectedProducts: 13
  });

  const [pendingInspections, setPendingInspections] = useState([
    {
      id: 'P10025',
      productName: 'Cà chua hữu cơ',
      farmerName: 'Nguyễn Văn A',
      requestDate: new Date(2023, 10, 25, 8, 30),
      location: 'Hà Nội, Việt Nam',
      priority: 'HIGH'
    },
    {
      id: 'P10024',
      productName: 'Bắp cải organic',
      farmerName: 'Trần Thị B',
      requestDate: new Date(2023, 10, 24, 10, 15),
      location: 'Đà Lạt, Việt Nam',
      priority: 'MEDIUM'
    },
    {
      id: 'P10023',
      productName: 'Ớt chuông xanh',
      farmerName: 'Phạm Văn C',
      requestDate: new Date(2023, 10, 23, 7, 45),
      location: 'Đồng Nai, Việt Nam',
      priority: 'LOW'
    },
    {
      id: 'P10022',
      productName: 'Rau xà lách',
      farmerName: 'Lê Thị D',
      requestDate: new Date(2023, 10, 22, 9, 30),
      location: 'Hải Phòng, Việt Nam',
      priority: 'HIGH'
    }
  ]);
  
  const [recentCertifications, setRecentCertifications] = useState([
    {
      id: 'C10025',
      productName: 'Dưa hấu sạch',
      result: 'PASS',
      farmerName: 'Vũ Văn E',
      certDate: new Date(2023, 10, 20, 15, 30),
      certType: 'Organic'
    },
    {
      id: 'C10024',
      productName: 'Bí đỏ hữu cơ',
      result: 'PASS',
      farmerName: 'Hoàng Thị F',
      certDate: new Date(2023, 10, 19, 11, 15),
      certType: 'Non-GMO'
    },
    {
      id: 'C10023',
      productName: 'Chuối tiêu',
      result: 'FAIL',
      farmerName: 'Ngô Văn G',
      certDate: new Date(2023, 10, 18, 9, 45),
      certType: 'Organic'
    }
  ]);
  
  const priorityColors = {
    'HIGH': 'error',
    'MEDIUM': 'warning',
    'LOW': 'success'
  };

  const priorityLabels = {
    'HIGH': 'Cao',
    'MEDIUM': 'Trung bình',
    'LOW': 'Thấp'
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: 'Mã SP',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Nông dân',
      dataIndex: 'farmerName',
      key: 'farmerName',
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => date.toLocaleDateString('vi-VN')
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priorityColors[priority]}>
          {priorityLabels[priority]}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<SafetyOutlined />}
          onClick={() => navigate(`/inspection/product/${record.id}`)}
        >
          Kiểm định
        </Button>
      )
    }
  ];

  if (loading) {
    return (
      <PageContainer
        title="Bảng điều khiển thanh tra viên"
        loading={true}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Bảng điều khiển thanh tra viên"
      subTitle="Giám sát và quản lý hoạt động kiểm định nông sản"
      header={{
        style: {
          background: 'linear-gradient(120deg, #722ed1 0%, #9254de 100%)',
          color: '#fff',
          borderRadius: '4px',
          padding: '16px',
          marginBottom: '24px',
        },
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Chờ kiểm định"
              value={stats.pendingInspections}
              prefix={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
              suffix={<RiseOutlined style={{ fontSize: 12, color: '#52c41a' }} />}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Đã kiểm định"
              value={stats.completedInspections}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Đạt chứng nhận"
              value={stats.certifiedProducts}
              prefix={<SafetyOutlined style={{ color: '#722ed1' }} />}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Không đạt"
              value={stats.rejectedProducts}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
            />
          </ProCard>
        </Col>
        
        <Col span={24}>
          <ProCard
            title={
              <Space>
                <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                <span>Đang chờ kiểm định</span>
              </Space>
            }
            extra={
              <Button type="primary" ghost onClick={() => navigate('/inspection/products')}>
                Xem tất cả
              </Button>
            }
          >
            <Table
              dataSource={pendingInspections}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          </ProCard>
        </Col>

        <Col xs={24} lg={12}>
          <ProCard
            title={
              <Space>
                <CheckCircleOutlined />
                <span>Chứng nhận gần đây</span>
              </Space>
            }
            headerBordered
          >
            <List
              itemLayout="horizontal"
              dataSource={recentCertifications}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button 
                      size="small" 
                      type="link" 
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/inspection/product/${item.id}`)}
                    >
                      Chi tiết
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar 
                      size="large" 
                      icon={item.result === 'PASS' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                      style={{
                        backgroundColor: item.result === 'PASS' ? '#52c41a' : '#ff4d4f',
                        color: '#fff'
                      }}
                    />}
                    title={
                      <Space>
                        <Text strong>{item.productName}</Text>
                        <Tag color={item.result === 'PASS' ? 'success' : 'error'}>
                          {item.result === 'PASS' ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                        </Tag>
                      </Space>
                    }
                    description={
                      <>
                        <div>Nông dân: {item.farmerName}</div>
                        <div>
                          <Text type="secondary">
                            {item.certDate.toLocaleDateString('vi-VN')} | 
                            Loại: {item.certType}
                          </Text>
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </ProCard>
        </Col>

        <Col xs={24} lg={12}>
          <ProCard
            title={
              <Space>
                <PieChartOutlined />
                <span>Phân tích kiểm định</span>
              </Space>
            }
            headerBordered
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Tỷ lệ đạt"
                    value={Math.round((stats.certifiedProducts / stats.completedInspections) * 100)}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Progress 
                    percent={Math.round((stats.certifiedProducts / stats.completedInspections) * 100)} 
                    strokeColor="#52c41a" 
                    showInfo={false}
                  />
                </Card>
              </Col>
              
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Tỷ lệ không đạt"
                    value={Math.round((stats.rejectedProducts / stats.completedInspections) * 100)}
                    suffix="%"
                    valueStyle={{ color: '#ff4d4f' }}
                  />
                  <Progress 
                    percent={Math.round((stats.rejectedProducts / stats.completedInspections) * 100)} 
                    strokeColor="#ff4d4f" 
                    showInfo={false}
                  />
                </Card>
              </Col>
              
              <Col span={24}>
                <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: 8 }}>
                  <Empty description="Biểu đồ phân tích sẽ hiển thị ở đây" />
                </div>
              </Col>
            </Row>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default InspectionDashboard; 