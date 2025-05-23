import React, { useState, useEffect } from 'react';
import { Modal, Space, Tag, Descriptions, Card, Spin, Empty, Alert, Typography, List, Avatar, Timeline, Image, Row, Col, Button, Divider } from 'antd';
import {
  HistoryOutlined,
  LoadingOutlined,
  PictureOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { getProductionStepsByProductLot } from '../../api/api.product';
import moment from 'moment';

const { Text, Title, Paragraph } = Typography;

const ProductionStepModal = ({ visible, onClose, productId }) => {
  const [productionSteps, setProductionSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (visible && productId) {
      fetchProductionStepsData();
    }
  }, [visible, productId]);

  const fetchProductionStepsData = async () => {
    try {
      setLoading(true);
      const response = await getProductionStepsByProductLot(productId);
      if (response && Array.isArray(response)) {
        setProductionSteps(response);
      } else {
        setProductionSteps([]);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching production steps data:', error);
      setError('Không thể tải dữ liệu quá trình sản xuất. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Format date to show in timeline
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  };

  // Format step type for display
  const formatStepType = (stepType) => {
    const stepTypes = {
      'WATERING': 'Tưới nước',
      'FERTILIZING': 'Bón phân',
      'PEST_CONTROL': 'Kiểm soát sâu bệnh',
      'PRUNING': 'Tỉa cây',
      'HARVESTING': 'Thu hoạch',
      'WEATHER_RECORD': 'Ghi nhận thời tiết',
      'OTHER': 'Hoạt động khác'
    };
    return stepTypes[stepType] || stepType;
  };

  // Assign different colors for different step types
  const getStepTypeColor = (stepType) => {
    const colors = {
      'WATERING': 'blue',
      'FERTILIZING': 'green',
      'PEST_CONTROL': 'orange',
      'PRUNING': 'purple',
      'HARVESTING': 'gold',
      'WEATHER_RECORD': 'cyan',
      'OTHER': 'default'
    };
    return colors[stepType] || 'default';
  };

  const renderProductionStepsList = () => {
    if (productionSteps.length === 0) {
      return <Empty description="Chưa có hoạt động sản xuất nào được ghi nhận" />;
    }

    return (
      <Timeline mode="left">
        {productionSteps.map((step, index) => (
          <Timeline.Item 
            key={step.id || index}
            color={getStepTypeColor(step.stepType)}
            dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            <Card 
              size="small" 
              style={{ marginBottom: 16 }}
              title={
                <Space>
                  <Tag color={getStepTypeColor(step.stepType)}>
                    {formatStepType(step.stepType)}
                  </Tag>
                  <Text type="secondary">{formatDate(step.createdAt)}</Text>
                </Space>
              }
            >
              <Paragraph>{step.description}</Paragraph>
              
              {step.photoUrl && (
                <div style={{ marginTop: 12 }}>
                  <Image 
                    src={`http://localhost:8080/storage/production-steps/${step.photoUrl}`}
                    alt="Production step photo"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
              
              {step.blockchainTxHash && (
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    <CheckCircleOutlined style={{ color: 'green', marginRight: 4 }} />
                    Đã xác thực trên blockchain
                  </Text>
                </div>
              )}
            </Card>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  };

  return (
    <Modal
      title={
        <Space>
          <HistoryOutlined />
          <span>Quá trình sản xuất</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>
      ]}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <div style={{ marginTop: 16 }}>Đang tải dữ liệu quá trình sản xuất...</div>
        </div>
      ) : error ? (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
        />
      ) : (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Title level={5}>Nhật ký sản xuất</Title>
            <Text type="secondary">
              Thông tin về các hoạt động trong quá trình sản xuất sản phẩm
            </Text>
          </div>
          {renderProductionStepsList()}
        </div>
      )}
    </Modal>
  );
};

export default ProductionStepModal; 