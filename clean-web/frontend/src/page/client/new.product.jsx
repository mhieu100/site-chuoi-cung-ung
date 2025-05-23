import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProductLot, uploadImage } from '../../api/api.product'
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  InputNumber, 
  Button, 
  Card, 
  Layout, 
  Row, 
  Col, 
  Space, 
  Typography, 
  Divider, 
  Alert, 
  Spin, 
  message,
  Upload,
  Modal,
  Descriptions,
  Empty
} from 'antd'
import { 
  SaveOutlined, 
  RollbackOutlined, 
  InfoCircleOutlined,
  UploadOutlined,
  PictureOutlined,
  PlusOutlined,
  LoadingOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const NewProductPage = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.account.user)
  const [form] = Form.useForm()
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProductLotId, setNewProductLotId] = useState(null);

  // Watch form values for preview section
  const onValuesChange = (_, allValues) => {
    setFormValues({...allValues});
  };

  const handleSubmit = async (values) => {
    if (!imageUrl) {
      message.error('Vui lòng tải lên hình ảnh sản phẩm!');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Authentication check is now handled by PrivateRoute component
      // No need to check user.fullname here anymore

      // Chuẩn bị dữ liệu theo định dạng server yêu cầu
      const productLotData = {
        ...values,
        plantedDate: values.plantedDate.toISOString(),
        harvestDate: values.harvestDate.toISOString(),
        status: "CREATED",
        blockchainTxHash: null,
        imageUrl: imageUrl,
        farmer: {
          walletAddress: user.walletAddress
        }
      };
      
      // Gọi API để tạo lô nông sản mới
      const response = await createProductLot(productLotData);
      
      message.success('Lô nông sản đã được tạo thành công!');
      setSuccess(true);
      
      // Lưu ID của lô nông sản mới được tạo
      setNewProductLotId(response.id);
      
      // Show modal instead of auto redirect
      setModalVisible(true);
      
    } catch (err) {
      console.error('Lỗi khi tạo lô nông sản:', err);
      setError(err?.message || 'Đã xảy ra lỗi khi tạo lô nông sản mới');
      message.error('Không thể tạo lô nông sản. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduction = () => {
    navigate(`/production-steps/${newProductLotId}`);
  };

  const handleReturnToHome = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  // Validate file before upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Bạn chỉ có thể tải lên file hình ảnh!');
      return false;
    }
    
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Hình ảnh phải nhỏ hơn 5MB!');
      return false;
    }
    
    return isImage && isLt5M;
  };

  // Custom upload function using API
  const customUpload = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      setUploadLoading(true);
      // Show uploading status
      onProgress({ percent: 0 });
      
      // Upload file to server
      const response = await uploadImage(file, 'products');
      console.log(response)
      setImageUrl(response);
      // Report success
      onProgress({ percent: 100 });
      onSuccess(imageUrl);
      message.success('Tải lên hình ảnh thành công!');
    } catch (err) {
      console.error('Error uploading file:', err);
      onError(err);
      message.error('Tải lên hình ảnh thất bại!');
    } finally {
      setUploadLoading(false);
    }
  };

  // Function to format crop type for display
  const formatCropType = (cropType) => {
    const cropTypes = {
      'VEGETABLE': 'Rau',
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
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Row gutter={24}>
          {/* Form Card - Left Side */}
          <Col xs={24} lg={14}>
            <Card 
              title={<Title level={3}>Thêm Lô Nông Sản Mới</Title>}
              bordered={false}
              className="shadow-md"
            >
              {success && (
                <Alert
                  message="Thành công!"
                  description="Lô nông sản đã được tạo thành công! Dữ liệu sẽ được ghi vào blockchain sau khi xác nhận."
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
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark
                onValuesChange={onValuesChange}
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Tên sản phẩm"
                      name="productName"
                      rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    >
                      <Input placeholder="Ví dụ: Cải xanh, Cà chua, Dưa lưới..." />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Loại cây trồng"
                      name="cropType"
                      rules={[{ required: true, message: 'Vui lòng chọn loại cây trồng' }]}
                    >
                      <Select placeholder="Chọn loại cây trồng">
                        <Option value="VEGETABLE">Rau</Option>
                        <Option value="FRUIT">Trái cây</Option>
                        <Option value="CEREAL">Ngũ cốc</Option>
                        <Option value="BEANS">Đậu</Option>
                        <Option value="ROOT">Củ</Option>
                        <Option value="HERB">Thảo mộc</Option>
                        <Option value="OTHER">Khác</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Khối lượng (kg)"
                      name="weight"
                      rules={[{ required: true, message: 'Vui lòng nhập khối lượng' }]}
                    >
                      <InputNumber
                        min={0.1}
                        step={0.1}
                        style={{ width: '100%' }}
                        placeholder="Ví dụ: 100"
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Ngày gieo trồng"
                      name="plantedDate"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày gieo trồng' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Dự kiến thu hoạch"
                      name="harvestDate"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày dự kiến thu hoạch' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                    <Form.Item
                      label="Địa chỉ vị trí trồng"
                      name="location"
                      rules={[{ required: true, message: 'Vui lòng nhập địa chỉ vị trí trồng' }]}
                    >
                      <Input placeholder="Địa chỉ chi tiết của trang trại/khu vực canh tác" />
                    </Form.Item>
                  </Col>
                  
                  <Col span={24}>
                    <Form.Item
                      label="Tọa độ GPS"
                      name="gpsCoordinates"
                      tooltip={{ title: 'Định dạng: Vĩ độ, Kinh độ (có thể để trống)', icon: <InfoCircleOutlined /> }}
                    >
                      <Input placeholder="Ví dụ: 21.027763, 105.834160" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Hình ảnh sản phẩm"
                      name="image"
                      tooltip={{ title: 'Tải lên hình ảnh đại diện cho sản phẩm', icon: <InfoCircleOutlined /> }}
                    >
                      <Upload
                        listType="picture-card"
                        className="upload-list-inline"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={customUpload}
                      >
                        {imageUrl ? (
                          <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <img 
                              src={`http://localhost:8080/storage/products/${imageUrl}`} 
                              alt="Hình ảnh sản phẩm" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          </div>
                        ) : (
                          <div>
                            {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
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
                          Xóa hình ảnh
                        </Button>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                
                <Divider />
                
                <Form.Item>
                  <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleCancel} icon={<RollbackOutlined />}>
                      Hủy
                    </Button>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={isSubmitting}
                      icon={<SaveOutlined />}
                    >
                      Tạo lô nông sản
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
              
              <div style={{ marginTop: 16, backgroundColor: '#f9f9f9', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
                <Space align="start">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.45)', fontSize: 16, marginTop: 2 }} />
                  <div>
                    <Text strong>Lưu ý:</Text>
                    <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                      <li>Tất cả các trường có dấu <Text type="danger">*</Text> là bắt buộc.</li>
                      <li>Dữ liệu lô nông sản sẽ được ghi vào blockchain để đảm bảo tính minh bạch và truy xuất nguồn gốc.</li>
                      <li>Sau khi tạo, lô nông sản sẽ ở trạng thái "CREATED" và đợi các bước tiếp theo trong chuỗi cung ứng.</li>
                      <li>Bạn có thể theo dõi và cập nhật thông tin của lô nông sản trong mục "Quản lý sản phẩm".</li>
                      <li>Hình ảnh sản phẩm bắt buộc phải được tải lên.</li>
                    </ul>
                  </div>
                </Space>
              </div>
            </Card>
          </Col>

          {/* Preview Card - Right Side */}
          <Col xs={24} lg={10}>
            <Card
              title={<Title level={3}>Xác Nhận Thông Tin</Title>}
              bordered={false}
              className="shadow-md"
              style={{ position: 'sticky', top: '80px' }}
            >
              {!formValues || Object.keys(formValues).length === 0 ? (
                <Empty 
                  description="Vui lòng nhập thông tin sản phẩm để xem trước"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ) : (
                <>
                  {imageUrl && (
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                      <img 
                        src={`http://localhost:8080/storage/products/${imageUrl}`} 
                        alt="Hình ảnh sản phẩm" 
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
                      />
                    </div>
                  )}
                  
                  <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="Tên sản phẩm">
                      {formValues.productName || '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Loại cây trồng">
                      {formValues.cropType ? formatCropType(formValues.cropType) : '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Khối lượng">
                      {formValues.weight ? `${formValues.weight} kg` : '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Ngày gieo trồng">
                      {formValues.plantedDate ? formValues.plantedDate.format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Ngày thu hoạch">
                      {formValues.harvestDate ? formValues.harvestDate.format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Địa chỉ trồng">
                      {formValues.location || '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Tọa độ GPS">
                      {formValues.gpsCoordinates || '-'}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Người trồng">
                      {user.fullname || '-'}
                    </Descriptions.Item>
                  </Descriptions>
                  
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Text type="secondary">
                      Vui lòng kiểm tra kỹ thông tin trước khi tạo lô nông sản
                    </Text>
                  </div>
                </>
              )}
            </Card>
          </Col>
        </Row>
        
        {/* Confirmation Modal */}
        <Modal
          title={<><CheckCircleOutlined style={{ color: '#52c41a' }} /> Tạo lô nông sản thành công</>}
          open={modalVisible}
          onCancel={handleReturnToHome}
          footer={[
            <Button key="home" onClick={handleReturnToHome}>
              Trở về trang chủ
            </Button>,
            <Button key="update" type="primary" onClick={handleUpdateProduction}>
              Cập nhật quá trình sản xuất
            </Button>,
          ]}
        >
          <p>Bạn muốn cập nhật quá trình sản xuất cho lô nông sản này không?</p>
          <p>Việc cập nhật quá trình sản xuất sẽ giúp người tiêu dùng hiểu rõ hơn về quá trình sản xuất của sản phẩm.</p>
        </Modal>
      </Content>
    </Layout>
  )
}

export default NewProductPage