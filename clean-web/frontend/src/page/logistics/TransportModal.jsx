import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Typography, Divider, Select, Spin, message, Radio } from 'antd';
import { CarOutlined, SaveOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getProductLotById } from '../../api/api.product';
import { createLogisticsEntry } from '../../api/api.logistics';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const TransportModal = ({ visible, productId, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productLot, setProductLot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [vehicleType, setVehicleType] = useState('TRUCK');

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId || !visible) return;
      
      try {
        setLoading(true);
        const product = await getProductLotById(productId);
        setProductLot(product);
        form.setFieldsValue({
          destinationAddress: product.location || '',
          notes: ''
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
        message.error('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, visible, form]);

  const handleConfirm = async (values) => {
    setSubmitting(true);
    try {
      // Gửi thông tin form cùng với yêu cầu xác nhận vận chuyển
      const transportData = {
        productLotId: productId,
        destinationAddress: values.destinationAddress,
        notes: values.notes || ''
      };
      
      await createLogisticsEntry(transportData);
      message.success('Đã xác nhận vận chuyển thành công!');
      form.resetFields();
      onSuccess(productId);
    } catch (error) {
      console.error('Error confirming transport:', error);
      message.error('Không thể xác nhận vận chuyển. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  // Danh sách địa chỉ kho lưu trữ
  const warehouseAddresses = [
    { value: 'Số 38 Bạch Mai, Hai Bà Trưng, Hà Nội', label: 'Kho Hà Nội - Bạch Mai' },
    { value: 'Số 125 Võ Văn Ngân, Thủ Đức, TP.HCM', label: 'Kho HCM - Thủ Đức' },
    { value: 'Số 56 Bạch Đằng, Hải Châu, Đà Nẵng', label: 'Kho Đà Nẵng - Hải Châu' },
    { value: 'Số 22 Trần Phú, Nha Trang, Khánh Hòa', label: 'Kho Nha Trang' },
    { value: 'Số 45 Lê Lợi, Thành phố Huế, Thừa Thiên Huế', label: 'Kho Huế' }
  ];

  const handleSelectWarehouse = (value) => {
    form.setFieldsValue({
      destinationAddress: value
    });
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CarOutlined style={{ fontSize: 20, marginRight: 8 }} />
          <span>Xác nhận vận chuyển</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {productLot && (
            <div style={{ marginBottom: 20 }}>
              <Title level={5}>Thông tin sản phẩm</Title>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Text strong>Tên sản phẩm:</Text>
                <Text>{productLot.productName}</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Text strong>Loại sản phẩm:</Text>
                <Text>{productLot.cropType}</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Text strong>Trọng lượng:</Text>
                <Text>{productLot.weight} kg</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Text strong>Địa điểm hiện tại:</Text>
                <Text>{productLot.location || 'Không có thông tin'}</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Text strong>Ngày thu hoạch:</Text>
                <Text>{productLot.harvestDate ? new Date(productLot.harvestDate).toLocaleDateString('vi-VN') : 'Không có thông tin'}</Text>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Text strong>Nông dân:</Text>
                <Text>{productLot.farmer?.fullname || 'Không có thông tin'}</Text>
              </div>
            </div>
          )}
          
          <Divider />
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleConfirm}
          >
            <Form.Item
              label="Chọn địa chỉ kho lưu trữ"
              extra="Chọn một địa chỉ kho có sẵn hoặc nhập địa chỉ mới bên dưới"
            >
              <Select
                placeholder="Chọn địa chỉ kho"
                style={{ width: '100%' }}
                options={warehouseAddresses}
                onChange={handleSelectWarehouse}
              />
            </Form.Item>
            
            <Form.Item
              label="Phương tiện vận chuyển"
              name="vehicleType"
              initialValue={vehicleType}
            >
              <Radio.Group onChange={e => setVehicleType(e.target.value)}>
                <Space direction="vertical">
                  <Radio value="TRUCK">Xe tải</Radio>
                  <Radio value="VAN">Xe tải nhỏ</Radio>
                  <Radio value="REFRIGERATED">Xe tải đông lạnh</Radio>
                  <Radio value="OTHER">Khác</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              label="Địa chỉ đích"
              name="destinationAddress"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ đích' }]}
              tooltip={{ title: 'Địa chỉ cụ thể nơi hàng hóa sẽ được giao đến', icon: <InfoCircleOutlined /> }}
            >
              <Input 
                placeholder="Nhập địa chỉ đích đến của lô hàng"
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>
            
            <Form.Item
              label="Ghi chú"
              name="notes"
            >
              <TextArea
                rows={4}
                placeholder="Thông tin thêm về lô hàng (kích thước, yêu cầu đặc biệt, v.v.)"
              />
            </Form.Item>
            
            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={onCancel}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  icon={<SaveOutlined />}
                >
                  Xác nhận vận chuyển
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default TransportModal; 