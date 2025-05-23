import React, { useState, useEffect } from 'react';
import { Modal, Timeline, Space, Tag, Descriptions, Card, Spin, Empty, Alert, Typography, Row, Col, Statistic, Table } from 'antd';
import {
  EnvironmentOutlined,
  CarOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  DashboardOutlined,

} from '@ant-design/icons';
import { getLogisticsByProductLot } from '../../api/api.logistics';
import moment from 'moment';

const { Text, Title, Paragraph } = Typography;

const LogisticsModal = ({ visible, onClose, productId }) => {
  const [logisticsData, setLogisticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && productId) {
      fetchLogisticsData();
    }
  }, [visible, productId]);

  const fetchLogisticsData = async () => {
    try {
      setLoading(true);
      const response = await getLogisticsByProductLot(productId);
      if (response && Array.isArray(response)) {
        setLogisticsData(response);
        console.log('Logistics data:', response);
      } else {
        setLogisticsData([]);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching logistics data:', error);
      setError('Không thể tải dữ liệu vận chuyển. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Parse tempLog JSON
  const parsetempLog = (tempLog) => {
    if (!tempLog) return [];
    
    try {
      return JSON.parse(tempLog);
    } catch (e) {
      console.error('Error parsing temperature log:', e);
      return [];
    }
  };

  // Format date to show in timeline
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  };

  // Format crop type for display
  const formatCropType = (cropType) => {
    const cropTypes = {
      'VEGETABLE': 'Rau củ',
      'FRUIT': 'Trái cây',
      'CEREAL': 'Ngũ cốc',
      'BEANS': 'Đậu',
      'ROOT': 'Củ',
      'HERB': 'Thảo mộc',
      'OTHER': 'Khác'
    };
    return cropTypes[cropType] || cropType;
  };

  // Generate timeline items for a logistics entry
  const generateTimelineItems = (logistics) => {
    const items = [];

    // Starting point - using departedAt instead of createdAt
    if (logistics.departedAt) {
      items.push({
        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        color: 'blue',
        children: (
          <Space direction="vertical" size={0}>
            <Text strong>Bắt đầu vận chuyển</Text>
            <Text type="secondary">{formatDate(logistics.departedAt)}</Text>
            <Text>{logistics.originAddress || 'Địa chỉ không xác định'}</Text>
          </Space>
        )
      });
    }

    // Process tempLog data for checkpoints
    const tempData = parsetempLog(logistics.tempLog);
    if (tempData && Array.isArray(tempData)) {
      tempData.forEach((point, index) => {
        // Only show non-delivery completion points in the main timeline
        if (!point.deliveryCompleted) {
          items.push({
            dot: <EnvironmentOutlined style={{ fontSize: '16px' }} />,
            color: 'green',
            children: (
              <Space direction="vertical" size={0}>
                <Text strong>Điểm kiểm tra #{index + 1}</Text>
                <Text type="secondary">{formatDate(point.timestamp)}</Text>
                <Text>{point.location || 'Vị trí không xác định'}</Text>
                {point.notes && <Text italic>{point.notes}</Text>}
                <Space>
                  {point.temperature && (
                    <Tag color="blue">Nhiệt độ: {point.temperature}°C</Tag>
                  )}
                  {point.humidity && (
                    <Tag color="cyan">Độ ẩm: {point.humidity}%</Tag>
                  )}
                </Space>
              </Space>
            )
          });
        }
      });
    }

    // End point if arrived
    if (logistics.arrivedAt) {
      items.push({
        dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
        color: 'green',
        children: (
          <Space direction="vertical" size={0}>
            <Text strong>Đã đến nơi</Text>
            <Text type="secondary">{formatDate(logistics.arrivedAt)}</Text>
            <Text>{logistics.destinationAddress || 'Địa chỉ không xác định'}</Text>
          </Space>
        )
      });
    } else if (items.length > 0) {
      // If not arrived yet, show ongoing status
      items.push({
        dot: <LoadingOutlined style={{ fontSize: '16px' }} />,
        color: 'gold',
        children: (
          <Space direction="vertical" size={0}>
            <Text strong>Đang vận chuyển</Text>
            <Text type="secondary">Dự kiến đến: {formatDate(logistics.estimatedArrival) || 'Không xác định'}</Text>
            <Text>{logistics.destinationAddress || 'Địa chỉ không xác định'}</Text>
          </Space>
        )
      });
    }

    return items;
  };

  const renderTempLogTable = (tempLog) => {
    const data = parsetempLog(tempLog);
    
    if (!data || data.length === 0) return <Empty description="Không có dữ liệu nhiệt độ" />;
    
    const columns = [
      {
        title: 'Thời gian',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (text) => formatDate(text),
      },
      {
        title: 'Vị trí',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Nhiệt độ (°C)',
        dataIndex: 'temperature',
        key: 'temperature',
        render: (temp) => (
          <Tag color={temp > 30 ? 'red' : temp < 10 ? 'blue' : 'green'}>
            {temp}°C
          </Tag>
        )
      },
      {
        title: 'Độ ẩm (%)',
        dataIndex: 'humidity',
        key: 'humidity',
        render: (humidity) => (
          <Tag color="cyan">{humidity}%</Tag>
        )
      },
      {
        title: 'Ghi chú',
        dataIndex: 'notes',
        key: 'notes',
        render: (notes) => notes || '-',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'deliveryCompleted',
        key: 'deliveryCompleted',
        render: (completed) => (
          completed ? 
            <Tag color="success">Đã hoàn thành</Tag> : 
            <Tag color="processing">Đang vận chuyển</Tag>
        )
      }
    ];
    
    return (
      <Table 
        dataSource={data.map((item, index) => ({...item, key: index}))}
        columns={columns}
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <Modal
      title={
        <Space>
          <CarOutlined />
          <span>Thông tin vận chuyển</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Đang tải dữ liệu vận chuyển...</div>
        </div>
      ) : error ? (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
        />
      ) : logisticsData.length === 0 ? (
        <Empty
          description="Không tìm thấy dữ liệu vận chuyển cho sản phẩm này"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {logisticsData.map((logistics, index) => (
            <Card
              key={logistics.id || index}
              title={
                <Space>
                  <span>Lô hàng #{index + 1}</span>
                  {logistics.arrivedAt ? (
                    <Tag color="success">Đã hoàn thành</Tag>
                  ) : (
                    <Tag color="processing">Đang vận chuyển</Tag>
                  )}
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Descriptions
                    title="Thông tin vận chuyển"
                    column={1}
                    bordered
                    size="small"
                  >
                    <Descriptions.Item label="Mã vận chuyển">
                      {logistics.id || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Người vận chuyển">
                      {logistics.transporter?.fullname || 'N/A'}
                    </Descriptions.Item>
                 
                    <Descriptions.Item label="Đến địa chỉ">
                      {logistics.destinationAddress || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian bắt đầu">
                      {formatDate(logistics.departedAt) || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian đến">
                      {formatDate(logistics.arrivedAt) || 'Chưa đến'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sản phẩm">
                      {logistics.productLot?.productName || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Loại sản phẩm">
                      {formatCropType(logistics.productLot?.cropType) || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Khối lượng">
                      {logistics.productLot?.weight ? `${logistics.productLot.weight} kg` : 'N/A'}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col xs={24} md={16}>
                  <Card
                    title={<Space><HistoryOutlined /> Quá trình vận chuyển</Space>}
                    style={{ marginBottom: 16 }}
                  >
                    <Timeline items={generateTimelineItems(logistics)} />
                  </Card>

                  {logistics.tempLog && (
                    <Card
                      title={<Space><HistoryOutlined /> Dữ liệu kiểm tra nhiệt độ & độ ẩm</Space>}
                      style={{ marginBottom: 16 }}
                    >
                      {renderTempLogTable(logistics.tempLog)}
                    </Card>
                  )}

                  {logistics.notes && (
                    <Card
                      title={<Space><DashboardOutlined /> Ghi chú</Space>}
                    >
                      <Paragraph>{logistics.notes}</Paragraph>
                    </Card>
                  )}
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default LogisticsModal; 