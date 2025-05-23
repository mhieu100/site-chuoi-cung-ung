import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProductLotsByStatus } from '../../api/api.product';
import TransportModal from './TransportModal';
import {
  PageContainer,
  ProCard,
} from '@ant-design/pro-components';
import {
  Table,
  Button,
  Tag,
  Space,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Empty,
  Spin,
  message,
  Badge,
  Tooltip
} from 'antd';
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  EyeOutlined,
  EnvironmentOutlined,
  ShoppingOutlined,
  InboxOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const TransportRequests = () => {
  const [productLots, setProductLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [processingIds, setProcessingIds] = useState([]);
  const [processedToday, setProcessedToday] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);

  // Fetch product lots with REQUEST_TRANSPORTED status
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProductLotsByStatus('REQUEST_TRANSPORTED');
        setProductLots(response || []);
      } catch (error) {
        console.error('Error fetching transport requests:', error);
        message.error('Không thể tải danh sách yêu cầu vận chuyển');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Handle click to view details
  const handleViewDetails = (id) => {
    navigate(`/logistics/${id}`);
  };

  // Function to handle modal close
  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedProductId(null);
  };

  // Function to handle successful transport confirmation
  const handleConfirmSuccess = (productId) => {
    setModalVisible(false);
    setSelectedProductId(null);
    
    // Remove the confirmed item from the list
    setProductLots(productLots.filter(lot => lot.id !== productId));
    setProcessedToday(prev => prev + 1);
    
    // Also remove from selected keys if selected
    if (selectedRowKeys.includes(productId)) {
      setSelectedRowKeys(selectedRowKeys.filter(key => key !== productId));
    }
  };
  
  // Open modal to handle transport confirmation
  const openConfirmModal = (id) => {
    setSelectedProductId(id);
    setModalVisible(true);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            shape="square" 
            size={40}
            src={record.imageUrl ? `http://localhost:8080/storage/products/${record.imageUrl}` : null}
            icon={!record.imageUrl && <ShoppingOutlined />}
          />
          <div style={{ marginLeft: 12 }}>
            <Text strong>{text}</Text>
            <div>
              <Badge status="processing" color="blue" />
              <Text type="secondary" style={{ fontSize: '12px' }}>Yêu cầu vận chuyển</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'cropType',
      key: 'cropType',
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: 'Trọng lượng',
      dataIndex: 'weight',
      key: 'weight',
      render: (text) => `${text} kg`,
    },
    {
      title: 'Ngày thu hoạch',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
      render: (text) => formatDate(text),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      render: (text) => (
        <span>
          <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Nông dân',
      dataIndex: 'farmer',
      key: 'farmer',
      render: (farmer) => farmer?.fullname || 'N/A',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        
          <Button 
            type="primary" 
            icon={<CarOutlined />}
            onClick={() => openConfirmModal(record.id)}
          >
            Xác nhận vận chuyển
          </Button>
      ),
    },
  ];

  // Handle batch confirmation
  const handleBatchConfirm = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một lô sản phẩm');
      return;
    }

    // Update to use first selected item
    if (selectedRowKeys.length > 0) {
      openConfirmModal(selectedRowKeys[0]);
    }
  };

  return (
    <PageContainer
      title="Yêu cầu vận chuyển"
      subTitle="Danh sách các lô sản phẩm cần được vận chuyển"
      extra={[
        <Button
          key="batch-confirm"
          type="primary"
          icon={<CheckCircleOutlined />}
          disabled={selectedRowKeys.length === 0}
          onClick={handleBatchConfirm}
        >
          Xác nhận hàng loạt ({selectedRowKeys.length})
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={8}>
              <ProCard>
                <Statistic 
                  title="Tổng số yêu cầu" 
                  value={productLots.length} 
                  prefix={<InboxOutlined />} 
                />
              </ProCard>
            </Col>
            <Col span={8}>
              <ProCard>
                <Statistic 
                  title="Đang chờ xử lý" 
                  value={productLots.length} 
                  prefix={<ClockCircleOutlined />} 
                  valueStyle={{ color: '#1890ff' }}
                />
              </ProCard>
            </Col>
            <Col span={8}>
              <ProCard>
                <Statistic 
                  title="Đã xử lý hôm nay" 
                  value={processedToday} 
                  prefix={<CheckCircleOutlined />} 
                  valueStyle={{ color: '#52c41a' }}
                />
              </ProCard>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <ProCard
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CarOutlined style={{ marginRight: 8 }} />
                <span>Danh sách yêu cầu vận chuyển</span>
              </div>
            }
            extra={
              <Tooltip title="Chọn các hàng để xác nhận hàng loạt">
                <Text type="secondary">
                  <InfoCircleOutlined style={{ marginRight: 5 }} />
                  Đã chọn: {selectedRowKeys.length}
                </Text>
              </Tooltip>
            }
          >
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <Spin size="large" />
              </div>
            ) : productLots.length > 0 ? (
              <Table 
                columns={columns} 
                dataSource={productLots.map(lot => ({ ...lot, key: lot.id }))}
                rowSelection={{
                  selectedRowKeys,
                  onChange: setSelectedRowKeys,
                }}
                pagination={{ 
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50'],
                  showTotal: (total) => `Tổng cộng ${total} yêu cầu`
                }}
              />
            ) : (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description="Không có yêu cầu vận chuyển nào" 
              />
            )}
          </ProCard>
        </Col>
      </Row>
      
      {/* Add the modal component */}
      <TransportModal 
        visible={modalVisible}
        productId={selectedProductId}
        onCancel={handleModalCancel}
        onSuccess={handleConfirmSuccess}
      />
    </PageContainer>
  );
};

export default TransportRequests; 