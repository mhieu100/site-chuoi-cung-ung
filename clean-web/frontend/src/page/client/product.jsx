import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Typography, 
  Button, 
  Image, 
  Row, 
  Col, 
  Divider, 
  Tag, 
  Timeline,
  Descriptions,
  Modal,
  Tabs,
  Space,
  Alert,
  Empty
} from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  LoadingOutlined,
  EnvironmentOutlined,
  AuditOutlined,
  SafetyOutlined,
  CarOutlined,
  EyeOutlined,
  CheckOutlined,
  HistoryOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductLotById, verifyProductLotIntegrity } from '../../api/api.product';
import { getInspectionsByProductLot } from '../../api/api.inspection';
import { getLogisticsByProductLot } from '../../api/api.logistics';
import InspectionModal from '../../components/client/InspectionModal';
import ProductionStepModal from '../../components/client/ProductionStepModal';
import CertificateTemplate from '../../components/client/CertificateTemplate';
import moment from 'moment';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetailPage = () => {
  const { productLotId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inspections, setInspections] = useState([]);
  const [logisticsData, setLogisticsData] = useState([]);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [inspectionModalVisible, setInspectionModalVisible] = useState(false);
  const [productionModalVisible, setProductionModalVisible] = useState(false);
  const [certificateModalVisible, setCertificateModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch product data
        const response = await getProductLotById(productLotId);
        setProduct(response);
        
        // Load certificates/verifications
        const inspectionResponse = await getInspectionsByProductLot(productLotId);
        setInspections(Array.isArray(inspectionResponse) ? inspectionResponse : []);
        
        // Load transportation data
        const logisticsResponse = await getLogisticsByProductLot(productLotId);
        setLogisticsData(Array.isArray(logisticsResponse) ? logisticsResponse : []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    if (productLotId) {
      fetchData();
    }
  }, [productLotId]);

  const handleVerifyIntegrity = async () => {
    setVerifying(true);
    try {
      const result = await verifyProductLotIntegrity(productLotId);
      setVerificationResult({
        verified: result,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error verifying product:', error);
      setVerificationResult({
        verified: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setVerifying(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  };

  const parseTempLog = (tempLog) => {
    if (!tempLog) return [];
    try {
      return JSON.parse(tempLog);
    } catch (e) {
      return [];
    }
  };

  if (loading) {
    return (
      <Layout>
        <Content style={{ padding: '50px' }}>
          <Card loading={true}>
            <LoadingOutlined style={{ fontSize: 24 }} /> Loading...
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Image
                src={`http://localhost:8080/storage/products/${product.imageUrl}`}
                alt={product?.productName}
                style={{ width: '100%', borderRadius: 8 }}
              />
              
              {verificationResult && (
                <Alert
                  message={verificationResult.verified ? "Dữ liệu toàn vẹn" : "Dữ liệu không khớp"}
                  description={
                    verificationResult.verified 
                      ? "Dữ liệu sản phẩm trên blockchain khớp với dữ liệu trong cơ sở dữ liệu." 
                      : "Dữ liệu sản phẩm có thể đã bị thay đổi kể từ khi được ghi lên blockchain."
                  }
                  type={verificationResult.verified ? "success" : "error"}
                  showIcon
                  style={{ marginTop: 16 }}
                />
              )}
              
              <div style={{ marginTop: 16 }}>
                <Button 
                  type="primary" 
                  style={{ width: '100%' }}
                  onClick={handleVerifyIntegrity}
                  loading={verifying}
                >
                  Xác minh tính toàn vẹn dữ liệu
                </Button>
                
                <Button 
                  type="default" 
                  style={{ width: '100%', marginTop: 8 }}
                  onClick={() => setInspectionModalVisible(true)}
                  icon={<SafetyOutlined />}
                  disabled={!product || !product.id}
                >
                  Xem thông tin kiểm định
                </Button>

                <Button 
                  type="default" 
                  style={{ width: '100%', marginTop: 8 }}
                  onClick={() => setProductionModalVisible(true)}
                  icon={<HistoryOutlined />}
                >
                  Xem chi tiết quá trình sản xuất
                </Button>
                
                {product?.status === 'VERIFIED' && inspections && inspections.length > 0 && (
                  <Button 
                    type="primary" 
                    style={{ width: '100%', marginTop: 8 }}
                    onClick={() => setCertificateModalVisible(true)}
                    icon={<FileTextOutlined />}
                  >
                    Xem giấy chứng nhận
                  </Button>
                )}
              </div>
            </Col>
            
            <Col xs={24} md={16}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Title level={2}>{product?.productName}</Title>
                  <Text>Mã lô: {product?.id}</Text>
                </div>
                <Tag color="green" style={{ fontSize: 16, padding: '4px 8px' }}>
                  {product?.status}
                </Tag>
              </div>
              
              <Divider />
              
              <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin cơ bản" key="1">
                  <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                    <Descriptions.Item label="Loại cây trồng">{product?.cropType}</Descriptions.Item>
                    <Descriptions.Item label="Trọng lượng">{product?.weight} kg</Descriptions.Item>
                    <Descriptions.Item label="Ngày trồng">{new Date(product?.plantedDate).toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="Ngày thu hoạch">{new Date(product?.harvestDate).toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="Người trồng">{product?.farmer?.fullname}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{product?.location}</Descriptions.Item>
                  </Descriptions>
                </TabPane>
                
                <TabPane tab="Quá trình sản xuất" key="2">
                  <Timeline mode="left">
                    <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />} color="green">
                      <Space direction="vertical">
                        <Text strong>Tạo lô sản phẩm</Text>
                        <Text type="secondary">{new Date(product?.createdDate).toLocaleString()}</Text>
                      </Space>
                    </Timeline.Item>
                    
                    <Timeline.Item dot={<EnvironmentOutlined style={{ fontSize: '16px' }} />} color="blue">
                      <Space direction="vertical">
                        <Text strong>Bắt đầu trồng</Text>
                        <Text type="secondary">{new Date(product?.plantedDate).toLocaleString()}</Text>
                      </Space>
                    </Timeline.Item>
                    
                    <Timeline.Item dot={<AuditOutlined style={{ fontSize: '16px' }} />} color="blue">
                      <Space direction="vertical">
                        <Text strong>Thu hoạch</Text>
                        <Text type="secondary">{new Date(product?.harvestDate).toLocaleString()}</Text>
                        <Button 
                          type="link" 
                          size="small" 
                          onClick={() => setProductionModalVisible(true)}
                          icon={<EyeOutlined />}
                        >
                          Xem chi tiết hoạt động sản xuất
                        </Button>
                      </Space>
                    </Timeline.Item>
                    
                    {logisticsData.map((logistics, index) => (
                      <React.Fragment key={logistics.id || index}>
                        <Timeline.Item dot={<CarOutlined style={{ fontSize: '16px' }} />} color="orange">
                          <Space direction="vertical">
                            <Text strong>Bắt đầu vận chuyển #{index+1}</Text>
                            <Text type="secondary">{formatDate(logistics.departedAt)}</Text>
                            <Text>Từ: {logistics.originAddress || 'Không xác định'}</Text>
                            <Text>Đến: {logistics.destinationAddress || 'Không xác định'}</Text>
                            <Text>Người vận chuyển: {logistics.transporter?.fullname || 'N/A'}</Text>
                            {logistics.notes && <Text>Ghi chú: {logistics.notes}</Text>}
                          </Space>
                        </Timeline.Item>
                        
                        {logistics.arrivedAt && (
                          <Timeline.Item dot={<CheckOutlined style={{ fontSize: '16px' }} />} color="green">
                            <Space direction="vertical">
                              <Text strong>Đã đến nơi #{index+1}</Text>
                              <Text type="secondary">{formatDate(logistics.arrivedAt)}</Text>
                              <Text>{logistics.destinationAddress || 'Không xác định'}</Text>
                            </Space>
                          </Timeline.Item>
                        )}
                      </React.Fragment>
                    ))}
                    
                    {inspections && inspections.length > 0 && (
                      <Timeline.Item dot={<SafetyOutlined style={{ fontSize: '16px' }} />} color={inspections[0].result === 'PASS' ? 'green' : 'red'}>
                        <Space direction="vertical">
                          <Text strong>Kiểm định {inspections[0].result === 'PASS' ? '(Đạt)' : '(Không đạt)'}</Text>
                          <Text type="secondary">{formatDate(inspections[0].createdDate)}</Text>
                          <Text>Người kiểm định: {inspections[0].inspector?.fullname || 'N/A'}</Text>
                          {inspections[0].notes && <Text>Ghi chú: {inspections[0].notes}</Text>}
                          {product?.status === 'VERIFIED' && (
                            <Button 
                              type="link" 
                              size="small" 
                              onClick={() => setCertificateModalVisible(true)}
                              icon={<FileTextOutlined />}
                            >
                              Xem giấy chứng nhận
                            </Button>
                          )}
                        </Space>
                      </Timeline.Item>
                    )}
                  </Timeline>
                </TabPane>
                
                <TabPane tab="Kiểm định" key="3">
                  {inspections && inspections.length > 0 ? (
                    <div>
                      {inspections.map((inspection, index) => (
                        <Card
                          key={inspection.id || index}
                          style={{ marginBottom: 16 }}
                          title={
                            <Space>
                              <SafetyOutlined />
                              <span>Kiểm định ngày {formatDate(inspection.createdDate)}</span>
                            </Space>
                          }
                          extra={
                            <Space>
                              <Tag color={inspection.result === 'PASS' ? 'green' : 'red'}>
                                {inspection.result === 'PASS' ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                              </Tag>
                              {inspection.result === 'PASS' && (
                                <Button 
                                  type="primary" 
                                  size="small" 
                                  icon={<FileTextOutlined />}
                                  onClick={() => setCertificateModalVisible(true)}
                                >
                                  Giấy chứng nhận
                                </Button>
                              )}
                            </Space>
                          }
                        >
                          <Descriptions column={1}>
                            <Descriptions.Item label="Thanh tra viên">
                              {inspection.inspector?.fullname || 'N/A'}
                            </Descriptions.Item>
                            
                            <Descriptions.Item label="Thời gian">
                              {formatDate(inspection.createdDate)}
                            </Descriptions.Item>
                            
                            {inspection.notes && (
                              <Descriptions.Item label="Ghi chú">
                                {inspection.notes}
                              </Descriptions.Item>
                            )}
                            
                            {inspection.certificateUrl && (
                              <Descriptions.Item label="Giấy chứng nhận">
                                <a 
                                  href={`http://localhost:8080/storage/certificates/${inspection.certificateUrl}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  <Button type="primary" size="small">
                                    Xem giấy chứng nhận
                                  </Button>
                                </a>
                              </Descriptions.Item>
                            )}
                          </Descriptions>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Empty 
                      description="Chưa có giấy chứng nhận nào cho sản phẩm này"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </TabPane>
                
                <TabPane tab="Vận chuyển" key="4">
                  {logisticsData && logisticsData.length > 0 ? (
                    <div>
                      {logisticsData.map((logistics, index) => (
                        <Card
                          key={logistics.id || index}
                          style={{ marginBottom: 16 }}
                          title={
                            <Space>
                              <CarOutlined />
                              <span>Vận chuyển #{index + 1}</span>
                            </Space>
                          }
                          extra={
                            <Tag color={logistics.arrivedAt ? 'green' : 'processing'}>
                              {logistics.arrivedAt ? 'Đã hoàn thành' : 'Đang vận chuyển'}
                            </Tag>
                          }
                        >
                          <Descriptions column={2} bordered>
                            <Descriptions.Item label="Thời gian bắt đầu">
                              {formatDate(logistics.departedAt)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Thời gian kết thúc">
                              {logistics.arrivedAt ? formatDate(logistics.arrivedAt) : 'Chưa kết thúc'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Người vận chuyển">
                              {logistics.transporter?.fullname || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ đi">
                              {logistics.originAddress || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ đến" span={2}>
                              {logistics.destinationAddress || 'N/A'}
                            </Descriptions.Item>
                            {logistics.notes && (
                              <Descriptions.Item label="Ghi chú" span={2}>
                                {logistics.notes}
                              </Descriptions.Item>
                            )}
                          </Descriptions>

                          {/* Temperature Data */}
                          {logistics.tempLog && (
                            <div style={{ marginTop: 16 }}>
                              <Divider orientation="left">Dữ liệu nhiệt độ và độ ẩm</Divider>
                              {parseTempLog(logistics.tempLog).map((log, idx) => (
                                <Card key={idx} size="small" style={{ marginBottom: 8 }}>
                                  <Row gutter={16}>
                                    <Col span={6}>
                                      <Text strong>Thời gian:</Text> {formatDate(log.timestamp)}
                                    </Col>
                                    <Col span={6}>
                                      <Text strong>Vị trí:</Text> {log.location || 'N/A'}
                                    </Col>
                                    <Col span={6}>
                                      <Text strong>Nhiệt độ:</Text> <Tag color={log.temperature > 30 ? 'red' : 'green'}>{log.temperature}°C</Tag>
                                    </Col>
                                    <Col span={6}>
                                      <Text strong>Độ ẩm:</Text> <Tag color="blue">{log.humidity}%</Tag>
                                    </Col>
                                    {log.notes && (
                                      <Col span={24}>
                                        <Text strong>Ghi chú:</Text> {log.notes}
                                      </Col>
                                    )}
                                  </Row>
                                </Card>
                              ))}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Empty 
                      description="Không có thông tin vận chuyển cho sản phẩm này"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </TabPane>
                
              </Tabs>
            </Col>
          </Row>
        </Card>
      </Content>
      
      {/* Inspection Modal */}
      <InspectionModal
        visible={inspectionModalVisible}
        onClose={() => setInspectionModalVisible(false)}
        productId={product?.id}
      />

      {/* Production Steps Modal */}
      <ProductionStepModal
        visible={productionModalVisible}
        onClose={() => setProductionModalVisible(false)}
        productId={product?.id}
      />
      
      {/* Certificate Modal */}
      {product?.status === 'VERIFIED' && inspections.length > 0 && (
        <CertificateTemplate
          visible={certificateModalVisible}
          onClose={() => setCertificateModalVisible(false)}
          product={product}
          inspection={inspections[0]} // Pass the first inspection result
        />
      )}
    </Layout>
  );
};

export default ProductDetailPage;