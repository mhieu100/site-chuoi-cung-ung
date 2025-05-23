import React, { useState, useEffect } from 'react';
import { Modal, Space, Tag, Descriptions, Card, Spin, Empty, Alert, Typography, Row, Col, Button, Divider } from 'antd';
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  FileDoneOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { getInspectionsByProductLot } from '../../api/api.inspection';
import moment from 'moment';

const { Text, Title, Paragraph } = Typography;

const InspectionModal = ({ visible, onClose, productId }) => {
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (visible && productId) {
      fetchInspectionData();
    }
  }, [visible, productId]);

  const fetchInspectionData = async () => {
    try {
      setLoading(true);
      const response = await getInspectionsByProductLot(productId);
      if (response && Array.isArray(response) && response.length > 0) {
        setInspection(response[0]);  // Lấy kết quả đầu tiên
      } else {
        setInspection(null);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching inspection data:', error);
      setError('Không thể tải dữ liệu kiểm định. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Format date to show in timeline
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  };

  const renderInspectionResult = () => {
    if (!inspection) return null;
    
    return (
      <Card>
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Title level={4}>Kết quả kiểm định</Title>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            {inspection.result === 'PASS' ? (
              <>
                <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                <Title level={3} style={{ color: '#52c41a', margin: '16px 0' }}>
                  Sản phẩm đạt chuẩn
                </Title>
              </>
            ) : (
              <>
                <CloseCircleOutlined style={{ fontSize: 48, color: '#f5222d' }} />
                <Title level={3} style={{ color: '#f5222d', margin: '16px 0' }}>
                  Sản phẩm không đạt chuẩn
                </Title>
              </>
            )}
          </Col>
          <Col span={24}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Thời gian kiểm định">
                {formatDate(inspection.createdDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Người kiểm định">
                {inspection.inspector?.fullname || 'N/A'}
              </Descriptions.Item>
              {inspection.notes && (
                <Descriptions.Item label="Ghi chú">
                  {inspection.notes}
                </Descriptions.Item>
              )}
            </Descriptions>
            
            {inspection.certificateUrl && (
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <a 
                  href={`http://localhost:8080/storage/certificates/${inspection.certificateUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button type="primary" icon={<DownloadOutlined />}>
                    Xem giấy chứng nhận
                  </Button>
                </a>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <Modal
      title={
        <Space>
          <SafetyCertificateOutlined />
          <span>Thông tin kiểm định</span>
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
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Đang tải dữ liệu kiểm định...</div>
        </div>
      ) : error ? (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
        />
      ) : !inspection ? (
        <Empty
          description="Sản phẩm này chưa được kiểm định"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div>
          {renderInspectionResult()}
        </div>
      )}
    </Modal>
  );
};

export default InspectionModal; 