import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  updateProductionStep,
  getProductLotById,
  getProductionStepsByProductLot,
  uploadImage,
  completeProduction,
  requestTransported
} from '../../api/api.product'
import InspectionModal from '../../components/client/InspectionModal'
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Layout,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Upload,
  message,
  Alert,
  List,
  Avatar,
  Badge,
  Empty,
  Tooltip,
  Modal,
  Image,
  Tag,
  Collapse
} from 'antd'
import {
  SaveOutlined,
  RollbackOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  CarOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  PictureOutlined,
  CalendarOutlined,
  FileImageOutlined
} from '@ant-design/icons'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { Option } = Select
const { TextArea } = Input
const { Panel } = Collapse

const ProductionStepPage = () => {
  const { productLotId } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.account.user)
  const [form] = Form.useForm()

  const [productLot, setProductLot] = useState(null)
  const [productionSteps, setProductionSteps] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [transporting, setTransporting] = useState(false)
  const [transportRequested, setTransportRequested] = useState(false)
  const [inspectionModalVisible, setInspectionModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!user?.fullname) {
          message.error('Bạn cần đăng nhập để thực hiện chức năng này')
          navigate('/login')
          return
        }

        // Lấy thông tin về lô nông sản
        const lotResponse = await getProductLotById(productLotId)
        setProductLot(lotResponse)
        
        // Kiểm tra xem sản phẩm đã được yêu cầu vận chuyển chưa
        if (lotResponse.status === 'REQUEST_TRANSPORTED') {
          setTransportRequested(true)
        }

        // Lấy danh sách các bước trong quá trình sản xuất
        const stepsResponse = await getProductionStepsByProductLot(productLotId, true)
        setProductionSteps(stepsResponse)

        setLoading(false)
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err)
        message.error('Không thể tải dữ liệu. Vui lòng thử lại sau.')
        setError(err?.message || 'Đã xảy ra lỗi khi tải dữ liệu')
        setLoading(false)
      }
    }

    fetchData()
  }, [productLotId, navigate, user])

  const handleSubmit = async (values) => {
    // Check if image is uploaded
    if (!imageUrl) {
      message.error('Vui lòng tải lên hình ảnh minh họa cho hoạt động!');
      return;
    }

    setSubmitting(true)
    setError(null)
    
    try {
      console.log('Bắt đầu cập nhật quá trình sản xuất với dữ liệu:', values)
      
      // Chuẩn bị dữ liệu theo định dạng server yêu cầu
      const stepData = {
        ...values,
        photoUrl: imageUrl, // URL hình ảnh đã upload
        blockchainTxHash: null,
        createdAt: new Date().toISOString()
      }
      
      console.log('Dữ liệu gửi đi:', stepData)
      
      // Gọi API để cập nhật quá trình sản xuất
      const response = await updateProductionStep(productLotId, stepData)
      
      console.log('API trả về:', response.data)
      
      message.success('Cập nhật quá trình sản xuất thành công!')
      setSuccess(true)
      
      // Reload danh sách các bước sau khi cập nhật
      const stepsResponse = await getProductionStepsByProductLot(productLotId, true)
      setProductionSteps(stepsResponse)
      
      // Reset form sau 2 giây
      setTimeout(() => {
        setSuccess(false)
        form.resetFields()
        setImageUrl('')
      }, 2000)
    } catch (err) {
      console.error('Lỗi chi tiết khi cập nhật quá trình sản xuất:', err)
      let errorMessage = 'Đã xảy ra lỗi khi cập nhật quá trình sản xuất'
      
      if (err.response) {
        console.error('Phản hồi lỗi từ server:', err.response.data)
        errorMessage = err.response.data.message || errorMessage
      }
      
      setError(errorMessage)
      message.error('Không thể cập nhật quá trình sản xuất. Vui lòng thử lại sau.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate(-1) // Điều hướng đến trang dashboard hoặc trang phù hợp
  }

  const handleImageUpload = (info) => {
    if (info.file.status === 'uploading') {
      // Hiển thị trạng thái đang upload
      return;
    }
    
    if (info.file.status === 'done') {
      // Lấy URL hình ảnh từ response
      const imageUrl = info.file.response;
      setImageUrl(imageUrl);
      message.success(`${info.file.name} tải lên thành công`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} tải lên thất bại: ${info.file.error?.message || 'Lỗi không xác định'}`);
    }
  }

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('Bạn chỉ có thể tải lên tệp hình ảnh!')
    }

    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 2MB!')
    }

    return isImage && isLt2M
  }

  // Upload function thật sử dụng API
  const customUpload = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      // Hiển thị trạng thái đang upload
      onProgress({ percent: 0 });
      // Upload file lên server
      const fileUrl = await uploadImage(file, 'production-steps');
      
      // Báo thành công và trả về URL
      onProgress({ percent: 100 });
      onSuccess(fileUrl);
    } catch (err) {
      console.error('Lỗi khi upload file:', err);
      onError(err);
    }
  }

  // Hàm để lấy URL đầy đủ cho hình ảnh
  const getFullImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    
    const baseUrl ='http://localhost:8080/storage/production-steps/';
    return baseUrl + url;
  };

  const handleCompleteProduction = async () => {
    try {
      setCompleting(true);
      await completeProduction(productLotId);
      message.success('Đã hoàn thành quá trình sản xuất!');
      // Refresh product lot data
      const updatedProductLot = await getProductLotById(productLotId);
      setProductLot(updatedProductLot);
      navigate('/production-steps/' + productLotId);
    } catch (error) {
      console.error('Error completing production:', error);
      message.error('Không thể hoàn thành quá trình sản xuất. Vui lòng thử lại sau.');
    } finally {
      setCompleting(false);
    }
  };

  const handleRequestTransport = async () => {
    Modal.confirm({
      title: 'Xác nhận chuyển giao',
      content: 'Bạn có chắc chắn muốn chuyển giao sản phẩm này cho đơn vị vận chuyển?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setTransporting(true);
          await requestTransported(productLotId);
          setTransportRequested(true);
          message.success('Đã gửi yêu cầu vận chuyển thành công!');
          // Refresh product lot data
          const updatedProductLot = await getProductLotById(productLotId);
          setProductLot(updatedProductLot);
          // Không chuyển hướng nữa, chỉ cập nhật trạng thái
        } catch (error) {
          console.error('Error requesting transport:', error);
          message.error('Không thể gửi yêu cầu vận chuyển. Vui lòng thử lại sau.');
        } finally {
          setTransporting(false);
        }
      }
    });
  };

  // Chuyển đổi kiểu hoạt động thành text hiển thị
  const getStepTypeText = (stepType) => {
    const stepTypes = {
      'WATERING': 'Tưới nước',
      'FERTILIZING': 'Bón phân',
      'PEST_CONTROL': 'Phòng trừ sâu bệnh',
      'PRUNING': 'Tỉa cây',
      'HARVESTING': 'Thu hoạch',
      'WEATHER_RECORD': 'Ghi chép thời tiết',
      'OTHER': 'Khác'
    };
    
    return stepTypes[stepType] || 'Không xác định';
  };

  // Lấy màu cho tag dựa trên loại hoạt động
  const getStepTypeColor = (stepType) => {
    const colors = {
      'WATERING': 'blue',
      'FERTILIZING': 'green',
      'PEST_CONTROL': 'red',
      'PRUNING': 'orange',
      'HARVESTING': 'purple',
      'WEATHER_RECORD': 'cyan',
      'OTHER': 'default'
    };
    
    return colors[stepType] || 'default';
  };

  if (loading) {
    return (
      <Layout>
        <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 24 }}>
              <Title level={3}>Đang tải...</Title>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }

  // Render content based on product status
  const renderContent = () => {
    if (!productLot) return null;
    
    switch(productLot.status) {
      case 'PRODUCTION_COMPLETED':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
            <Title level={4}>Quá trình sản xuất đã hoàn thành</Title>
            <Paragraph>
              Sản phẩm đã sẵn sàng để chuyển sang giai đoạn vận chuyển.
              Vui lòng nhấn nút "Giao cho đơn vị vận chuyển" để tiếp tục.
            </Paragraph>
          </div>
        );
      
      case 'REQUEST_TRANSPORTED':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
            <Title level={4}>Quá trình sản xuất đã hoàn thành</Title>
            <Paragraph>
              <Text strong style={{ color: '#1890ff' }}>Đang đợi đơn vị vận chuyển xác nhận...</Text>
            </Paragraph>
            <Alert
              message="Đang chờ xác nhận"
              description="Yêu cầu vận chuyển đã được gửi. Vui lòng đợi đơn vị vận chuyển xác nhận."
              type="info"
              showIcon
            />
          </div>
        );
      case 'TRANSPORTED':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
            <Title level={4}>Quá trình sản xuất đã hoàn thành</Title>
            <Paragraph>
              <Text strong style={{ color: '#1890ff' }}>Đang đợi đơn vị vận chuyển xác nhận...</Text>
            </Paragraph>
            <Alert
              message="Đang chờ xác nhận"
              description="Yêu cầu vận chuyển đã được gửi. Vui lòng đợi đơn vị vận chuyển xác nhận."
              type="info"
              showIcon
            />
          </div>
        );
      case 'VERIFIED':
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <SafetyCertificateOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
            <Title level={4}>Sản phẩm đã được kiểm định và xác nhận</Title>
            <Paragraph>
              <Text strong style={{ color: '#52c41a' }}>Quá trình kiểm định đã hoàn tất</Text>
            </Paragraph>
            <Alert
              message="Kiểm định thành công"
              description="Sản phẩm của bạn đã được kiểm định và xác nhận đạt chuẩn. Sản phẩm đã sẵn sàng để bán ra thị trường."
              type="success"
              showIcon
            />
            <div style={{ marginTop: 24 }}>
              <Button 
                type="primary" 
                icon={<SafetyCertificateOutlined />}
                onClick={() => setInspectionModalVisible(true)}
              >
                Xem chi tiết kiểm định
              </Button>
            </div>
          </div>
        );
      
      default:
        return (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Loại hoạt động"
                  name="stepType"
                  rules={[{ required: true, message: 'Vui lòng chọn loại hoạt động' }]}
                >
                  <Select placeholder="Chọn loại hoạt động">
                    <Option value="WATERING">Tưới nước</Option>
                    <Option value="FERTILIZING">Bón phân</Option>
                    <Option value="PEST_CONTROL">Phòng trừ sâu bệnh</Option>
                    <Option value="PRUNING">Tỉa cây</Option>
                    <Option value="HARVESTING">Thu hoạch</Option>
                    <Option value="WEATHER_RECORD">Ghi chép thời tiết</Option>
                    <Option value="OTHER">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Mô tả chi tiết"
                  name="description"
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Mô tả chi tiết về hoạt động này (loại phân bón, liều lượng, phương pháp, v.v.)"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Hình ảnh minh họa"
                  name="photo"
                  tooltip={{ title: 'Tải lên hình ảnh minh họa cho hoạt động (bắt buộc)', icon: <InfoCircleOutlined /> }}
                >
                  <Upload
                    listType="picture-card"
                    className="upload-list-inline"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={customUpload}
                    onChange={handleImageUpload}
                  >
                    {imageUrl ? (
                      <img 
                        src={getFullImageUrl(imageUrl)} 
                        alt="Ảnh đã tải" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div>
                        {submitting ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Tải lên</div>
                      </div>
                    )}
                  </Upload>
                  {imageUrl && (
                    <Button 
                      type="text" 
                      style={{ marginTop: 8 }} 
                      danger 
                      onClick={() => setImageUrl('')}
                    >
                      Xóa hình
                    </Button>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Form.Item>
              <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleCancel} icon={<RollbackOutlined />}>
                  Quay lại
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<SaveOutlined />}
                >
                  Cập nhật
                </Button>
              </Space>
            </Form.Item>
          </Form>
        );
    }
  };

  // Render action buttons based on product status
  const renderActionButtons = () => {
    if (!productLot) return null;
    
    switch(productLot.status) {
      case 'CREATED':
        return (
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            loading={completing}
            onClick={handleCompleteProduction}
          >
            Hoàn Thành Sản Xuất
          </Button>
        );
      
      case 'PRODUCTION_COMPLETED':
        return (
          <Tooltip title="Xác nhận chuyển giao sản phẩm cho đơn vị vận chuyển">
            <Button
              type="primary"
              icon={<CarOutlined />}
              loading={transporting}
              onClick={handleRequestTransport}
            >
              Giao cho đơn vị vận chuyển
            </Button>
          </Tooltip>
        );
      
      case 'REQUEST_TRANSPORTED':
        return (
          <Button
            type="default"
            icon={<ClockCircleOutlined />}
            disabled
          >
            Đang chờ xác nhận
          </Button>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        {/* Inspection Modal */}
        <InspectionModal
          visible={inspectionModalVisible}
          onClose={() => setInspectionModalVisible(false)}
          productId={productLotId}
        />
        
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card
              title={<Title level={3}>Cập Nhật Quá Trình Sản Xuất </Title>}
              extra={
                <Space>
                  {productLot && <Text strong>Lô: {productLot.productName}</Text>}
                  {renderActionButtons()}
                </Space>
              }
              style={{ marginBottom: 24 }}
              bordered={false}
              className="shadow-md"
            >
              {success && (
                <Alert
                  message="Thành công!"
                  description="Thông tin quá trình sản xuất đã được cập nhật thành công! Dữ liệu sẽ được ghi vào blockchain sau khi xác nhận."
                  type="success"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}

              {error && (
                <Alert
                  message="Lỗi!"
                  description={error}
                  type="error"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}

              {renderContent()}
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <HistoryOutlined style={{ marginRight: 8 }} />
                  <Text strong>Lịch sử hoạt động</Text>
                </div>
              }
              bordered={false}
              className="shadow-md"
            >
              {productionSteps.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={productionSteps}
                  renderItem={(step, index) => (
                    <List.Item
                      key={step.id}
                      style={{ 
                        background: '#f9f9f9', 
                        padding: 16, 
                        borderRadius: 8, 
                        marginBottom: 16,
                        border: '1px solid #f0f0f0' 
                      }}
                    >
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <Tag color={getStepTypeColor(step.stepType)} style={{ fontSize: 14, padding: '2px 8px' }}>
                            {getStepTypeText(step.stepType)}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <CalendarOutlined style={{ marginRight: 4 }} />
                            {new Date(step.createdAt).toLocaleDateString('vi-VN', { 
                              year: 'numeric', 
                              month: 'numeric', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </div>
                        
                        <Paragraph style={{ margin: '8px 0' }}>
                          {step.description}
                        </Paragraph>

                        {step.photoUrl && (
                          <div style={{ marginTop: 12 }}>
                            <Image 
                              src={getFullImageUrl(step.photoUrl)} 
                              alt="Hình ảnh hoạt động"
                              style={{ maxWidth: '100%', borderRadius: 4 }}
                              preview={{
                                mask: (
                                  <Space>
                                    <FileImageOutlined />
                                    Xem ảnh
                                  </Space>
                                )
                              }}
                            />
                          </div>
                        )}

                        {step.blockchainTxHash && (
                          <div style={{ marginTop: 8 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              <InfoCircleOutlined style={{ marginRight: 4 }} />
                              Đã xác thực trên blockchain
                            </Text>
                          </div>
                        )}
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Chưa có hoạt động nào được ghi lại" />
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default ProductionStepPage 