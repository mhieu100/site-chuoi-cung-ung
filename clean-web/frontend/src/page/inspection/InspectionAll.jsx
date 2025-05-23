import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  ProCard,
  ProTable
} from '@ant-design/pro-components';
import {
  Tag,
  Button,
  Space,
  message,
  Typography,
  Badge,
  Tooltip,
  Avatar,
  Row,
  Col,
  Modal,
  Descriptions,
  Divider
} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  SearchOutlined,
  EyeOutlined,
  FileSearchOutlined,
  InboxOutlined,
  CarOutlined
} from '@ant-design/icons';
import { getAllProductLots } from '../../api/api.product';
import { getLogisticsByProductLot } from '../../api/api.logistics';
import moment from 'moment';

const { Text, Title } = Typography;

const InspectionAll = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productLots, setProductLots] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [logisticsModalVisible, setLogisticsModalVisible] = useState(false);
  const [logisticsData, setLogisticsData] = useState([]);
  const [logisticsLoading, setLogisticsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      
      // Tách thành 2 lần gọi API riêng biệt vì API không hỗ trợ mảng status
      const transportedResponse = await getAllProductLots({
        ...params,
        status: 'TRANSPORTED'
      });
      
      const verifiedResponse = await getAllProductLots({
        ...params,
        status: 'VERIFIED'
      });
      
      // Kết hợp kết quả từ hai lần gọi API
      let combinedProducts = [];
      
      if (Array.isArray(transportedResponse)) {
        combinedProducts = [...combinedProducts, ...transportedResponse];
      }
      
      if (Array.isArray(verifiedResponse)) {
        combinedProducts = [...combinedProducts, ...verifiedResponse];
      }
      
      setProductLots(combinedProducts);
      setTotalProducts(combinedProducts.length);
    } catch (error) {
      console.error('Error fetching products:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi kết nối';
      message.error(`Không thể tải danh sách sản phẩm (${errorMessage}). Vui lòng kiểm tra kết nối mạng và thử lại.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogisticsData = async (productId) => {
    try {
      setLogisticsLoading(true);
      const response = await getLogisticsByProductLot(productId);
      if (response && Array.isArray(response)) {
        setLogisticsData(response);
      } else {
        setLogisticsData([]);
      }
    } catch (error) {
      console.error('Error fetching logistics data:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi kết nối';
      message.error(`Không thể tải dữ liệu vận chuyển (${errorMessage}). Vui lòng thử lại sau.`);
    } finally {
      setLogisticsLoading(false);
    }
  };

  const showLogisticsModal = async (product) => {
    setSelectedProduct(product);
    await fetchLogisticsData(product.id);
    setLogisticsModalVisible(true);
  };

  const closeLogisticsModal = () => {
    setLogisticsModalVisible(false);
    setSelectedProduct(null);
    setLogisticsData([]);
  };

  const navigateToInspection = (productId) => {
    navigate(`/inspection/product/${productId}`);
  };

  const getStatusTag = (status) => {
    const statusMap = {
      'CREATED': { color: 'blue', text: 'Đã tạo' },
      'PRODUCTION_COMPLETED': { color: 'green', text: 'Sản xuất hoàn thành' },
      'REQUEST_TRANSPORTED': { color: 'purple', text: 'Yêu cầu vận chuyển' },
      'TRANSPORTED': { color: 'cyan', text: 'Đã vận chuyển', icon: <CarOutlined /> },
      'VERIFIED': { color: 'gold', text: 'Đã kiểm định', icon: <SafetyOutlined /> },
      'SOLD': { color: 'geekblue', text: 'Đã bán' },
      'default': { color: 'default', text: status }
    };
    
    const { color, text, icon } = statusMap[status] || statusMap.default;
    return (
      <Tag color={color} icon={icon}>
        {text}
      </Tag>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD/MM/YYYY');
  };

  const parseTempLog = (tempLog) => {
    if (!tempLog) return [];
    try {
      return JSON.parse(tempLog);
    } catch (e) {
      return [];
    }
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

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <Space>
          <Avatar 
            shape="square" 
            size={40}
            src={record.imageUrl ? `http://localhost:8080/storage/products/${record.imageUrl}` : null}
            style={{ backgroundColor: '#f56a00' }}
          >
            {text?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>ID: {record.id}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'cropType',
      key: 'cropType',
      width: 100,
      render: (cropType) => formatCropType(cropType),
    },
    {
      title: 'Khối lượng',
      dataIndex: 'weight',
      key: 'weight',
      width: 120,
      render: (weight) => `${weight} kg`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Ngày trồng',
      dataIndex: 'plantedDate',
      key: 'plantedDate',
      width: 120,
      render: (date) => formatDate(date),
    },
    {
      title: 'Ngày thu hoạch',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
      width: 120,
      render: (date) => formatDate(date),
    },
    {
      title: 'Người trồng',
      dataIndex: 'farmer',
      key: 'farmer',
      width: 150,
      render: (farmer) => farmer?.fullname || 'N/A',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<FileSearchOutlined />} 
            onClick={() => navigateToInspection(record.id)}
           
            title={record.status === 'VERIFIED' ? 'Sản phẩm đã được kiểm định' : ''}
          >
            Đã kiểm định
          </Button>
          <Button 
            icon={<CarOutlined />} 
            onClick={() => showLogisticsModal(record)}
          >
            Vận chuyển
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Quản lý kiểm định sản phẩm"
      subTitle="Danh sách các lô sản phẩm đã vận chuyển cần kiểm định và lịch sử kiểm định"
      extra={[
        <Button key="refresh" onClick={() => fetchProducts()}>
          Làm mới
        </Button>
      ]}
    >
      <ProCard>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <ProCard
              title={
                <Space>
                  <InboxOutlined />
                  Tổng số lô hàng
                </Space>
              }
              hoverable
              style={{ height: '100%' }}
            >
              <Title level={2}>{totalProducts}</Title>
              <Text type="secondary">Lô hàng đã vận chuyển và đã kiểm định</Text>
            </ProCard>
          </Col>
          <Col span={8}>
            <ProCard
              title={
                <Space>
                  <ClockCircleOutlined />
                  Chờ kiểm định
                </Space>
              }
              hoverable
              style={{ height: '100%' }}
            >
              <Title level={2}>{productLots.filter(p => p.status === 'TRANSPORTED').length}</Title>
              <Text type="secondary">Lô hàng đã vận chuyển chờ kiểm định</Text>
            </ProCard>
          </Col>
          <Col span={8}>
            <ProCard
              title={
                <Space>
                  <CheckCircleOutlined />
                  Đã kiểm định
                </Space>
              }
              hoverable
              style={{ height: '100%' }}
            >
              <Title level={2}>{productLots.filter(p => p.status === 'VERIFIED').length}</Title>
              <Text type="secondary">Lô hàng đã hoàn thành kiểm định</Text>
            </ProCard>
          </Col>
        </Row>

        <ProTable
          headerTitle="Danh sách sản phẩm cần kiểm định"
          rowKey="id"
          loading={loading}
          dataSource={productLots}
          columns={columns}
          search={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          options={{
            density: true,
            fullScreen: true,
            reload: () => fetchProducts(),
          }}
          rowClassName={(record) => {
            if (record.status === 'VERIFIED') {
              return 'ant-table-row-verified';
            }
            return '';
          }}
        />
      </ProCard>

      <Modal
        title={
          <Space>
            <CarOutlined />
            <span>Thông tin vận chuyển lô hàng</span>
          </Space>
        }
        open={logisticsModalVisible}
        onCancel={closeLogisticsModal}
        width={900}
        footer={[
          <Button key="back" onClick={closeLogisticsModal}>
            Đóng
          </Button>,
          <Button 
            key="inspect" 
            type="primary" 
            onClick={() => {
              closeLogisticsModal();
              if (selectedProduct) {
                navigateToInspection(selectedProduct.id);
              }
            }}
            disabled={selectedProduct?.status === 'VERIFIED'}
          >
            {selectedProduct?.status === 'VERIFIED' ? 'Sản phẩm đã kiểm định' : 'Kiểm định sản phẩm'}
          </Button>
        ]}
      >
        {selectedProduct && (
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Text strong>Tên sản phẩm:</Text>
              <Text>{selectedProduct.productName}</Text>
            </Space>
            <br />
            <Space>
              <Text strong>Trạng thái:</Text>
              {getStatusTag(selectedProduct.status)}
            </Space>
          </div>
        )}
        
        {logisticsLoading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <span>Đang tải dữ liệu vận chuyển...</span>
          </div>
        ) : logisticsData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <span>Không tìm thấy dữ liệu vận chuyển</span>
          </div>
        ) : (
          <div>
            {logisticsData.map((logistics, index) => (
              <div key={logistics.id || index}>
                <Descriptions title={`Thông tin vận chuyển #${index + 1}`} bordered>
                  <Descriptions.Item label="Thời gian bắt đầu">
                    {moment(logistics.departedAt).format('DD/MM/YYYY HH:mm')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian kết thúc">
                    {logistics.arrivedAt ? moment(logistics.arrivedAt).format('DD/MM/YYYY HH:mm') : 'Chưa kết thúc'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Người vận chuyển">
                    {logistics.transporter?.fullname || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ đến" span={2}>
                    {logistics.destinationAddress || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú">
                    {logistics.notes || 'Không có ghi chú'}
                  </Descriptions.Item>
                </Descriptions>
                
                {logistics.tempLog && (
                  <>
                    <Divider />
                    <Title level={5}>Dữ liệu nhiệt độ và độ ẩm</Title>
                    <div>
                      {parseTempLog(logistics.tempLog).map((log, idx) => (
                        <div key={idx} style={{marginBottom: 10, padding: 10, border: '1px solid #f0f0f0', borderRadius: 4}}>
                          <Row gutter={16}>
                            <Col span={6}>
                              <Text strong>Thời gian:</Text> {moment(log.timestamp).format('DD/MM/YYYY HH:mm')}
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
                            <Col span={24}>
                              <Tag color={log.deliveryCompleted ? 'success' : 'processing'}>
                                {log.deliveryCompleted ? 'Đã hoàn thành' : 'Đang vận chuyển'}
                              </Tag>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {index < logisticsData.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default InspectionAll;