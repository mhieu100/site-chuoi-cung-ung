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
  Spin
} from 'antd';
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  RiseOutlined,
  EnvironmentOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Statistic } = StatisticCard;

const LogisticsDashboard = () => {
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulated data
  const [stats, setStats] = useState({
    activeShipments: 12,
    completedShipments: 48,
    totalProducts: 87,
    onTimeDelivery: 93
  });

  const [recentShipments, setRecentShipments] = useState([
    {
      id: 'L10025',
      productName: 'Bắp cải organic',
      status: 'IN_TRANSIT',
      departedAt: new Date(2023, 10, 25, 8, 30),
      destination: 'Hà Nội, Việt Nam',
      completion: 67
    },
    {
      id: 'L10024',
      productName: 'Cà chua hữu cơ',
      status: 'DELIVERED',
      departedAt: new Date(2023, 10, 24, 10, 15),
      destination: 'Hồ Chí Minh, Việt Nam',
      completion: 100
    },
    {
      id: 'L10023',
      productName: 'Rau xà lách xoăn',
      status: 'IN_TRANSIT',
      departedAt: new Date(2023, 10, 23, 7, 45),
      destination: 'Đà Nẵng, Việt Nam',
      completion: 42
    },
    {
      id: 'L10022',
      productName: 'Dưa lưới',
      status: 'DELAYED',
      departedAt: new Date(2023, 10, 22, 9, 30),
      destination: 'Cần Thơ, Việt Nam',
      completion: 35
    },
    {
      id: 'L10021',
      productName: 'Ớt chuông',
      status: 'DELIVERED',
      departedAt: new Date(2023, 10, 21, 14, 20),
      destination: 'Hải Phòng, Việt Nam',
      completion: 100
    }
  ]);
  
  const statusColors = {
    'IN_TRANSIT': 'processing',
    'DELIVERED': 'success',
    'DELAYED': 'warning',
    'CANCELLED': 'error'
  };

  const statusLabels = {
    'IN_TRANSIT': 'Đang vận chuyển',
    'DELIVERED': 'Đã giao hàng',
    'DELAYED': 'Bị trễ',
    'CANCELLED': 'Đã hủy'
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: 'Mã VC',
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>
          {statusLabels[status]}
        </Tag>
      )
    },
    {
      title: 'Ngày vận chuyển',
      dataIndex: 'departedAt',
      key: 'departedAt',
      render: (date) => date.toLocaleDateString('vi-VN')
    },
    {
      title: 'Điểm đến',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Tiến độ',
      dataIndex: 'completion',
      key: 'completion',
      render: (percent) => (
        <Progress 
          percent={percent} 
          size="small" 
          status={percent === 100 ? "success" : "active"}
        />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/logistics-tracking/${record.id}`)}
        >
          Chi tiết
        </Button>
      )
    }
  ];

  if (loading) {
    return (
      <PageContainer
        title="Tổng quan vận chuyển"
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
      title="Tổng quan vận chuyển"
      subTitle="Quản lý và giám sát các hoạt động vận chuyển nông sản"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Vận chuyển đang diễn ra"
              value={stats.activeShipments}
              prefix={<CarOutlined style={{ color: '#1890ff' }} />}
              suffix={<RiseOutlined style={{ fontSize: 12, color: '#52c41a' }} />}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Vận chuyển hoàn thành"
              value={stats.completedShipments}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Tổng số sản phẩm"
              value={stats.totalProducts}
              prefix={<ShoppingOutlined style={{ color: '#faad14' }} />}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <Statistic
              title="Tỷ lệ giao hàng đúng hạn"
              value={stats.onTimeDelivery}
              suffix="%"
              prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
            />
          </ProCard>
        </Col>
        
        <Col span={24}>
          <ProCard
            title={
              <Space>
                <CarOutlined />
                <span>Vận chuyển gần đây</span>
              </Space>
            }
            extra={
              <Button type="primary" ghost onClick={() => navigate('/logistics-portal/all-logistics')}>
                Xem tất cả
              </Button>
            }
          >
            <Table
              dataSource={recentShipments}
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
                <DashboardOutlined />
                <span>Biểu đồ nhiệt độ gần đây</span>
              </Space>
            }
          >
            {/* Placeholder for temperature chart */}
            <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: 8 }}>
              <Empty description="Biểu đồ nhiệt độ sẽ được hiển thị ở đây" />
            </div>
          </ProCard>
        </Col>

        <Col xs={24} lg={12}>
          <ProCard
            title={
              <Space>
                <EnvironmentOutlined />
                <span>Bản đồ vận chuyển</span>
              </Space>
            }
          >
            {/* Placeholder for logistics map */}
            <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: 8 }}>
              <Empty description="Bản đồ vận chuyển sẽ được hiển thị ở đây" />
            </div>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default LogisticsDashboard; 