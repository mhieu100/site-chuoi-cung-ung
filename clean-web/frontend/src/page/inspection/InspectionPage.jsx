import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PageContainer,
  ProCard,
  StepsForm,
} from '@ant-design/pro-components';
import {
  Typography,
  Button,
  Space,
  message,
  Tag,
  Form,
  Input,
  Radio,
  Upload,
  Descriptions,
  Row,
  Col,
  Card,
  Divider,
  Empty,
  Steps,
  Result
} from 'antd';
import {
  UploadOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { getProductLotById } from '../../api/api.product';
import { getLogisticsByProductLot } from '../../api/api.logistics';
import { verifyProduct, getInspectionsByProductLot } from '../../api/api.inspection';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

const InspectionPage = () => {
  const { productLotId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [inspection, setInspection] = useState(null);
  const [logisticsData, setLogisticsData] = useState([]);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchProductData();
    fetchLogisticsData();
    fetchInspectionData();
  }, [productLotId]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await getProductLotById(productLotId);
      setProduct(response);
    } catch (error) {
      console.error('Error fetching product data:', error);
      const errorMessage = error.response?.data?.message || 'Không xác định được lỗi cụ thể';
      message.error(`Không thể tải thông tin sản phẩm (${errorMessage}). Vui lòng kiểm tra kết nối mạng và thử lại.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogisticsData = async () => {
    try {
      const response = await getLogisticsByProductLot(productLotId);
      if (response && Array.isArray(response)) {
        setLogisticsData(response);
      } else {
        setLogisticsData([]);
      }
    } catch (error) {
      console.error('Error fetching logistics data:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi kết nối';
      message.error(`Không thể tải dữ liệu vận chuyển (${errorMessage}). Vui lòng thử lại sau.`);
    }
  };

  const fetchInspectionData = async () => {
    try {
      const response = await getInspectionsByProductLot(productLotId);
      if (response && Array.isArray(response) && response.length > 0) {
        setInspection(response[0]); // Lấy kết quả kiểm định đầu tiên
      } else {
        setInspection(null);
      }
    } catch (error) {
      console.error('Error fetching inspection data:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi kết nối';
      message.error(`Không thể tải dữ liệu kiểm định (${errorMessage}). Vui lòng thử lại sau.`);
    }
  };

  const handleVerification = async () => {
    if (!verificationResult) {
      message.error('Vui lòng chọn kết quả kiểm định trước khi tiếp tục');
      return;
    }

    try {
      setSubmitting(true);
      await verifyProduct(
        productLotId,
        verificationResult,
        verificationNotes,
        certificateFile
      );
      message.success('Kiểm định sản phẩm thành công!');
      setCurrentStep(2);
      fetchProductData(); // Refresh product data to get updated status
      fetchInspectionData(); // Refresh inspection data
    } catch (error) {
      console.error('Error verifying product:', error);
      const errorMessage = error.response?.data?.message || 'Lỗi không xác định';
      message.error(`Kiểm định sản phẩm thất bại (${errorMessage}). Vui lòng thử lại.`);
    } finally {
      setSubmitting(false);
    }
  };

  const parseTempLog = (tempLog) => {
    if (!tempLog) return [];
    try {
      return JSON.parse(tempLog);
    } catch (e) {
      return [];
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

  const getStatusTag = (status) => {
    const statusMap = {
      'CREATED': { color: 'blue', text: 'Đã tạo' },
      'PRODUCTION_COMPLETED': { color: 'green', text: 'Sản xuất hoàn thành' },
      'REQUEST_TRANSPORTED': { color: 'purple', text: 'Yêu cầu vận chuyển' },
      'TRANSPORTED': { color: 'cyan', text: 'Đã vận chuyển', icon: <CarOutlined /> },
      'VERIFIED': { color: 'gold', text: 'Đã kiểm định', icon: <SafetyCertificateOutlined /> },
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

  const renderInspectionStatus = () => {
    if (!inspection) {
      return <Empty description="Sản phẩm chưa được kiểm định" />;
    }

    return (
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          {inspection.result === 'PASS' ? (
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: 48, color: '#f5222d' }} />
          )}
          
          <Title level={3} style={{ 
            color: inspection.result === 'PASS' ? '#52c41a' : '#f5222d',
            margin: '16px 0' 
          }}>
            {inspection.result === 'PASS' ? 'Sản phẩm đạt chuẩn' : 'Sản phẩm không đạt chuẩn'}
          </Title>
        </div>
        
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Thời gian kiểm định">
            {formatDateTime(inspection.createdDate)}
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
            <Button 
              type="primary"
              href={`http://localhost:8080/storage/certificates/${inspection.certificateUrl}`} 
              target="_blank"
              icon={<SafetyCertificateOutlined />}
            >
              Xem giấy chứng nhận
            </Button>
          </div>
        )}
      </Card>
    );
  };

  const renderLogisticsData = () => {
    if (logisticsData.length === 0) {
      return <Empty description="Không tìm thấy dữ liệu vận chuyển" />;
    }

    return logisticsData.map((logistics, index) => (
      <Card 
        key={logistics.id || index} 
        title={`Thông tin vận chuyển #${index + 1}`}
        style={{ marginBottom: 16 }}
      >
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Thời gian bắt đầu">
            {formatDateTime(logistics.departedAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian kết thúc">
            {logistics.arrivedAt ? formatDateTime(logistics.arrivedAt) : 'Chưa kết thúc'}
          </Descriptions.Item>
          <Descriptions.Item label="Người vận chuyển">
            {logistics.transporter?.fullname || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ đến">
            {logistics.destinationAddress || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={2}>
            {logistics.notes || 'Không có ghi chú'}
          </Descriptions.Item>
        </Descriptions>

        {logistics.tempLog && (
          <>
            <Title level={5} style={{ marginTop: 16 }}>Dữ liệu nhiệt độ và độ ẩm</Title>
            <div>
              {parseTempLog(logistics.tempLog).map((log, idx) => (
                <div key={idx} style={{marginBottom: 10, padding: 10, border: '1px solid #f0f0f0', borderRadius: 4}}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Text strong>Thời gian:</Text> {formatDateTime(log.timestamp)}
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
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    ));
  };

  const renderVerificationForm = () => {
    if (product?.status === 'VERIFIED') {
      return (
        <Result
          status="success"
          title="Sản phẩm đã được kiểm định"
          subTitle={
            inspection?.result === 'PASS'
              ? "Sản phẩm này đã được kiểm định và xác nhận đạt chuẩn."
              : "Sản phẩm này đã được kiểm định nhưng không đạt chuẩn."
          }
          extra={[
            <Button 
              key="history" 
              type="primary"
              onClick={() => setCurrentStep(0)}
            >
              Xem chi tiết kiểm định
            </Button>
          ]}
        />
      );
    }

    return (
      <Card title="Kiểm định sản phẩm">
        <Form layout="vertical">
          <Form.Item 
            label="Kết quả kiểm định" 
            required 
            tooltip="Chọn kết quả kiểm định cho sản phẩm này"
          >
            <Radio.Group 
              onChange={(e) => setVerificationResult(e.target.value)}
              value={verificationResult}
            >
              <Radio value="PASS">
                <Tag color="success" icon={<CheckOutlined />}>Đạt chuẩn</Tag>
              </Radio>
              <Radio value="FAIL">
                <Tag color="error" icon={<CloseOutlined />}>Không đạt chuẩn</Tag>
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item 
            label="Ghi chú"
            tooltip="Ghi chú thêm về kết quả kiểm định"
          >
            <TextArea 
              rows={4} 
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              placeholder="Nhập ghi chú về kết quả kiểm định"
            />
          </Form.Item>

          <Form.Item 
            label="Tải lên giấy chứng nhận"
            tooltip="Tải lên giấy chứng nhận kiểm định (nếu có)"
          >
            <Upload 
              beforeUpload={(file) => {
                setCertificateFile(file);
                return false;
              }}
              onRemove={() => setCertificateFile(null)}
              fileList={certificateFile ? [certificateFile] : []}
            >
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                onClick={handleVerification}
                loading={submitting}
                disabled={!verificationResult}
              >
                Xác nhận kiểm định
              </Button>
              <Button onClick={() => setCurrentStep(0)}>
                Quay lại
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    );
  };

  // Define steps for the verification process
  const steps = [
    {
      title: 'Thông tin sản phẩm',
      icon: <InfoCircleOutlined />,
      content: (
        <div>
          {product && (
            <>
              <ProCard title="Thông tin sản phẩm" headerBordered>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="Tên sản phẩm">
                    {product.productName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {getStatusTag(product.status)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại sản phẩm">
                    {formatCropType(product.cropType)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Khối lượng">
                    {product.weight} kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày trồng">
                    {formatDate(product.plantedDate)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày thu hoạch">
                    {formatDate(product.harvestDate)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Người trồng" span={2}>
                    {product.farmer?.fullname || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mô tả" span={2}>
                    {product.description || 'Không có mô tả'}
                  </Descriptions.Item>
                </Descriptions>
              </ProCard>

              <Divider />

              <ProCard title="Dữ liệu vận chuyển" headerBordered>
                {renderLogisticsData()}
              </ProCard>

              <Divider />

              <ProCard title="Thông tin kiểm định" headerBordered>
                {renderInspectionStatus()}
              </ProCard>
              
              <div style={{ marginTop: 24, textAlign: 'right' }}>
                <Space>
                  <Button 
                    type="primary" 
                    onClick={() => setCurrentStep(1)}
                    disabled={product.status !== 'TRANSPORTED'}
                  >
                    {product.status === 'TRANSPORTED' 
                      ? 'Tiến hành kiểm định' 
                      : product.status === 'VERIFIED' 
                        ? 'Sản phẩm đã được kiểm định' 
                        : 'Sản phẩm không ở trạng thái có thể kiểm định'
                    }
                  </Button>
                  <Button onClick={() => navigate('/inspection/all-inspection')}>
                    Quay lại danh sách
                  </Button>
                </Space>
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Kiểm định',
      icon: <FileSearchOutlined />,
      content: renderVerificationForm(),
    },
    {
      title: 'Hoàn thành',
      icon: <FileDoneOutlined />,
      content: (
        <Result
          status={verificationResult === 'PASS' ? 'success' : 'warning'}
          title={verificationResult === 'PASS' 
            ? "Kiểm định sản phẩm thành công!" 
            : "Sản phẩm không đạt tiêu chuẩn kiểm định!"
          }
          subTitle={verificationResult === 'PASS'
            ? "Sản phẩm đã được kiểm định và cập nhật trạng thái đạt chuẩn."
            : "Sản phẩm đã được kiểm định và cập nhật trạng thái không đạt chuẩn."
          }
          extra={[
            <Button 
              type="primary" 
              key="list" 
              onClick={() => navigate('/inspection/all-inspection')}
            >
              Quay lại danh sách
            </Button>,
            <Button 
              key="detail" 
              onClick={() => setCurrentStep(0)}
            >
              Xem chi tiết sản phẩm
            </Button>,
          ]}
        />
      ),
    },
  ];

  return (
    <PageContainer
      title="Kiểm định sản phẩm"
      subTitle={`Mã sản phẩm: ${productLotId}`}
      loading={loading}
      onBack={() => navigate('/inspection/all-inspection')}
      extra={[
        <Button
          key="back"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/inspection/all-inspection')}
        >
          Danh sách sản phẩm
        </Button>
      ]}
    >
      <Steps
        current={currentStep}
        onChange={setCurrentStep}
        items={steps.map(item => ({
          title: item.title,
          icon: item.icon,
        }))}
      />
      
      <div style={{ marginTop: 24 }}>
        {steps[currentStep].content}
      </div>
    </PageContainer>
  );
};

export default InspectionPage;