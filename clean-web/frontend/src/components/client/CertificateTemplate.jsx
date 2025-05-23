import React, { useRef } from 'react';
import { Modal, Button, Space, Typography, Row, Col, Divider, Image, Card, Timeline, QRCode, Tag } from 'antd';
import {
  SafetyCertificateOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  AuditOutlined,
  CarOutlined,
  CheckOutlined
} from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const CertificateTemplate = ({ visible, onClose, product, inspection }) => {
  const certificateRef = useRef(null);

  const handleExportPDF = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // A4 size: 210 x 297 mm
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`giay_chung_nhan_${product?.id || 'san_pham'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD/MM/YYYY');
  };
  
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
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
  
  return (
    <Modal
      title={
        <Space>
          <SafetyCertificateOutlined />
          <span>Giấy chứng nhận sản phẩm</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button 
          key="pdf" 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleExportPDF}
        >
          Xuất PDF
        </Button>,
        <Button 
          key="close" 
          onClick={onClose}
        >
          Đóng
        </Button>
      ]}
    >
      <div 
        ref={certificateRef} 
        style={{
          padding: '30px',
          background: '#fff',
          border: '8px double #1890ff',
          borderRadius: '8px',
          margin: '10px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            fontSize: '100px',
            color: 'rgba(24, 144, 255, 0.05)',
            fontWeight: 'bold',
            zIndex: 0,
            whiteSpace: 'nowrap'
          }}
        >
          CLEAN AGRICULTURE
        </div>
        
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Row gutter={24} align="middle" justify="center">
            <Col>
              <div style={{ width: '100px', marginRight: '16px' }}>
                <Image
                  src="/logo-certificate.png"
                  alt="Logo"
                  preview={false}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg"
                />
              </div>
            </Col>
            <Col>
              <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                GIẤY CHỨNG NHẬN
              </Title>
              <Title level={4} style={{ margin: '4px 0 0 0', fontWeight: 'normal' }}>
                CERTIFICATE OF VERIFICATION
              </Title>
            </Col>
          </Row>

          <Divider style={{ margin: '20px 0', borderColor: '#1890ff' }} />
          
          <div style={{ padding: '0 20px' }}>
            <Title level={3} style={{ textAlign: 'center' }}>
              CHỨNG NHẬN SẢN PHẨM ĐÃ KIỂM ĐỊNH
            </Title>
            
            <Row gutter={[24, 0]}>
              <Col span={16}>
                <div style={{ textAlign: 'left', margin: '20px 0' }}>
                  <Title level={4}>THÔNG TIN SẢN PHẨM</Title>
                  <p><Text strong>Mã lô sản phẩm:</Text> {product?.id || 'N/A'}</p>
                  <p><Text strong>Tên sản phẩm:</Text> {product?.productName || 'N/A'}</p>
                  <p><Text strong>Loại sản phẩm:</Text> {formatCropType(product?.cropType) || 'N/A'}</p>
                  <p><Text strong>Trọng lượng:</Text> {product?.weight || 'N/A'} kg</p>
                  <p><Text strong>Ngày trồng:</Text> {formatDate(product?.plantedDate)}</p>
                  <p><Text strong>Ngày thu hoạch:</Text> {formatDate(product?.harvestDate)}</p>
                  <p><Text strong>Người sản xuất:</Text> {product?.farmer?.fullname || 'N/A'}</p>
                  <p><Text strong>Địa chỉ sản xuất:</Text> {product?.location || 'N/A'}</p>
                </div>
                
                <Divider style={{ margin: '20px 0', borderColor: '#1890ff' }} />
                
                <div style={{ textAlign: 'left', margin: '20px 0' }}>
                  <Title level={4}>THÔNG TIN KIỂM ĐỊNH</Title>
                  <p><Text strong>Ngày kiểm định:</Text> {formatDateTime(inspection?.createdDate) || 'N/A'}</p>
                  <p><Text strong>Thanh tra viên:</Text> {inspection?.inspector?.fullname || 'N/A'}</p>
                  <p><Text strong>Kết quả kiểm định:</Text> <Tag color={inspection?.result === 'PASS' ? 'green' : 'red'}>{inspection?.result === 'PASS' ? 'ĐẠT' : 'KHÔNG ĐẠT'}</Tag></p>
                  <p><Text strong>Ghi chú kiểm định:</Text> {inspection?.notes || 'Sản phẩm đạt tiêu chuẩn'}</p>
                </div>
              </Col>
              
              <Col span={8}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                  <Image
                    src={`http://localhost:8080/storage/products/${product?.imageUrl}`}
                    alt={product?.productName}
                    style={{ width: '100%', maxWidth: '200px', borderRadius: 8 }}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg"
                  />
                  
                  <div style={{ marginTop: '20px' }}>
                    <QRCode
                      value={`http://localhost:3000/product/${product?.id}`}
                      style={{ margin: '0 auto' }}
                    />
                    <p style={{ marginTop: '8px', textAlign: 'center' }}>
                      <Text type="secondary">Quét mã để xác minh</Text>
                    </p>
                  </div>
                  
                  <div style={{ marginTop: '20px' }}>
                    <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a' }} />
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                      SẢN PHẨM ĐẠT TIÊU CHUẨN
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            
            <Divider style={{ margin: '20px 0', borderColor: '#1890ff' }} />
            
            <Title level={4}>THÔNG TIN QUÁ TRÌNH SẢN XUẤT</Title>
            
            <Timeline mode="left" style={{ marginTop: '20px' }}>
              <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />} color="green">
                <Text strong>Tạo lô sản phẩm</Text> - {formatDateTime(product?.createdDate)}
              </Timeline.Item>
              
              <Timeline.Item dot={<EnvironmentOutlined style={{ fontSize: '16px' }} />} color="blue">
                <Text strong>Bắt đầu trồng</Text> - {formatDateTime(product?.plantedDate)}
              </Timeline.Item>
              
              <Timeline.Item dot={<AuditOutlined style={{ fontSize: '16px' }} />} color="blue">
                <Text strong>Thu hoạch</Text> - {formatDateTime(product?.harvestDate)}
              </Timeline.Item>
              
              <Timeline.Item dot={<SafetyCertificateOutlined style={{ fontSize: '16px' }} />} color="green">
                <Text strong>Kiểm định</Text> - {formatDateTime(inspection?.createdDate)}
              </Timeline.Item>
            </Timeline>
            
            <Row style={{ marginTop: '40px' }}>
              <Col span={8} style={{ textAlign: 'center' }}>
                <p><Text strong>Đại diện đơn vị sản xuất</Text></p>
                <div style={{ marginTop: '50px' }}>
                  <p>________________</p>
                </div>
              </Col>
              <Col span={8} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Image
                    src="/seal.png"
                    alt="Seal"
                    width={100}
                    preview={false}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg"
                  />
                  <p><Text strong>Chứng nhận số</Text></p>
                  <p>{product?.id}-{moment().format('DDMMYYYY')}</p>
                </div>
              </Col>
              <Col span={8} style={{ textAlign: 'center' }}>
                <p><Text strong>Đại diện đơn vị kiểm định</Text></p>
                <div style={{ marginTop: '50px' }}>
                  <p>________________</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CertificateTemplate;