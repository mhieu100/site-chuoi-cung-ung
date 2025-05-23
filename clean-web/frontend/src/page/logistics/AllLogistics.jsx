import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllLogistics, addLogisticsData } from '../../api/api.logistics';
import {
  PageContainer,
  ProCard
} from '@ant-design/pro-components';
import {
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Tooltip,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
  Row,
  Col,
  message,
  Badge,
  Divider,
  Timeline,
  Descriptions,
  Spin
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  PlusOutlined,
  CarOutlined,
  RollbackOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AllLogistics = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const [logistics, setLogistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLogistics, setSelectedLogistics] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [dataModalVisible, setDataModalVisible] = useState(false);
  const [dataForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchLogistics();
  }, []);

  const fetchLogistics = async () => {
    try {
      setLoading(true);
      const response = await getAllLogistics();
      console.log('All logistics data:', response);
      setLogistics(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching logistics:', error);
      message.error('Không thể tải dữ liệu vận chuyển. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Parse temperature log JSON
  const parseTemperatureLog = (tempLog) => {
    if (!tempLog) return [];
    
    try {
      return JSON.parse(tempLog);
    } catch (e) {
      console.error('Error parsing temperature log:', e);
      return [];
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value) => {
    setFilterStatus(value);
  };

  const showDetailModal = (record) => {
    setSelectedLogistics(record);
    setDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setDetailModalVisible(false);
  };

  const showDataModal = (record) => {
    setSelectedLogistics(record);
    setDataModalVisible(true);
  };

  const handleDataModalCancel = () => {
    setDataModalVisible(false);
    dataForm.resetFields();
  };

  const handleAddLogisticsData = async (values) => {
    if (!selectedLogistics) {
      message.error('Không có đơn vận chuyển được chọn');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Add timestamp to data
      const logisticsData = {
        ...values,
        timestamp: new Date().toISOString(),
        deliveryCompleted: values.deliveryCompleted || false
      };
      
      await addLogisticsData(selectedLogistics.id, logisticsData);
      
      message.success('Cập nhật dữ liệu vận chuyển thành công!');
      
      // Reload logistics entries
      fetchLogistics();
      
      // Close modal and reset form
      setDataModalVisible(false);
      dataForm.resetFields();
    } catch (err) {
      console.error('Error adding logistics data:', err);
      message.error('Không thể cập nhật dữ liệu vận chuyển. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter logistics data based on search text and status filter
  const filteredLogistics = logistics.filter((item) => {
    const matchesSearch = searchText === '' || 
      (item.productLot?.productName && item.productLot.productName.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.transporter?.fullname && item.transporter.fullname.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && item.arrivedAt) || 
      (filterStatus === 'active' && !item.arrivedAt);
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <Text ellipsis style={{ width: 70 }}>{id}</Text>
    },
    {
      title: 'Sản phẩm',
      key: 'product',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.productLot?.productName || 'N/A'}</Text>
          <Text type="secondary">{record.productLot?.id || 'N/A'}</Text>
        </Space>
      )
    },
    {
      title: 'Người vận chuyển',
      dataIndex: 'transporter',
      key: 'transporter',
      render: (transporter) => transporter?.fullname || 'N/A'
    },
    {
      title: 'Địa chỉ đích',
      key: 'destinationAddress',
      ellipsis: true,
      render: (_, record) => {
        const address = record.destinationAddress || 'N/A';
        return (
          <Tooltip title={address}>
            <Text ellipsis style={{ maxWidth: 150 }}>{address}</Text>
          </Tooltip>
        );
      }
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'departedAt',
      key: 'departedAt',
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A'
    },
    {
      title: 'Kết thúc',
      dataIndex: 'arrivedAt',
      key: 'arrivedAt',
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => record.arrivedAt 
        ? <Tag color="success">Hoàn thành</Tag>
        : <Tag color="processing">Đang vận chuyển</Tag>
    },
    {
      title: 'Số bản ghi',
      key: 'logCount',
      render: (_, record) => {
        const logs = parseTemperatureLog(record.tempLog);
        return <Badge count={logs.length} style={{ backgroundColor: logs.length > 0 ? '#1890ff' : '#ccc' }} />;
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => showDetailModal(record)}
          >
            Xem
          </Button>
          {!record.arrivedAt && (
            <Button 
              type="default" 
              size="small" 
              icon={<PlusOutlined />}
              onClick={() => showDataModal(record)}
            >
              Cập nhật
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <PageContainer
      title="Danh sách tất cả đơn vận chuyển"
      subTitle="Quản lý và theo dõi tất cả các đơn vận chuyển trong hệ thống"
    >
      <ProCard>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={10}>
            <Input 
              placeholder="Tìm kiếm theo tên sản phẩm hoặc người vận chuyển" 
              prefix={<SearchOutlined />} 
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={handleStatusFilter}
              placeholder="Lọc theo trạng thái"
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="active">Đang vận chuyển</Option>
              <Option value="completed">Đã hoàn thành</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Space>
              <Button 
                type="primary" 
                onClick={() => fetchLogistics()}
                loading={loading}
              >
                Làm mới
              </Button>
              <Button 
                icon={<RollbackOutlined />} 
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={filteredLogistics}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          locale={{
            emptyText: 'Không có dữ liệu vận chuyển'
          }}
        />

        {/* Modal xem chi tiết đơn vận chuyển */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CarOutlined style={{ fontSize: 20, marginRight: 8 }} />
              <span>Chi tiết vận chuyển</span>
            </div>
          }
          open={detailModalVisible}
          onCancel={handleDetailModalCancel}
          footer={[
            <Button key="back" onClick={handleDetailModalCancel}>
              Đóng
            </Button>
          ]}
          width={800}
        >
          {selectedLogistics && (
            <>
              <Descriptions
                title="Thông tin vận chuyển"
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                style={{ marginBottom: 24 }}
              >
                <Descriptions.Item label="ID">
                  {selectedLogistics.id}
                </Descriptions.Item>
                <Descriptions.Item label="Sản phẩm">
                  {selectedLogistics.productLot?.productName || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Người vận chuyển">
                  {selectedLogistics.transporter?.fullname || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian bắt đầu">
                  {selectedLogistics.departedAt 
                    ? new Date(selectedLogistics.departedAt).toLocaleString('vi-VN')
                    : 'N/A'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian kết thúc">
                  {selectedLogistics.arrivedAt 
                    ? new Date(selectedLogistics.arrivedAt).toLocaleString('vi-VN')
                    : 'Chưa hoàn thành'
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ đích" span={2}>
                  {selectedLogistics.destinationAddress || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú" span={2}>
                  {selectedLogistics.notes || 'Không có ghi chú'}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {selectedLogistics.arrivedAt 
                    ? <Tag color="success">Hoàn thành</Tag>
                    : <Tag color="processing">Đang vận chuyển</Tag>
                  }
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Lịch sử theo dõi</Divider>
              
              <Timeline>
                <Timeline.Item 
                  dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                  color="blue"
                >
                  <Text strong>Bắt đầu vận chuyển</Text>
                  <div>{new Date(selectedLogistics.departedAt).toLocaleString('vi-VN')}</div>
                </Timeline.Item>
                
                {parseTemperatureLog(selectedLogistics.tempLog).map((log, logIndex) => (
                  <Timeline.Item 
                    key={logIndex}
                    dot={
                      log.deliveryCompleted 
                        ? <CheckCircleOutlined style={{ fontSize: '16px' }} />
                        : <CheckCircleOutlined style={{ fontSize: '16px' }} />
                    }
                    color={log.deliveryCompleted ? "green" : "blue"}
                  >
                    <Text strong>
                      {log.deliveryCompleted ? 'Giao hàng thành công' : 'Cập nhật dữ liệu'}
                    </Text>
                    <div>{new Date(log.timestamp).toLocaleString('vi-VN')}</div>
                    {!log.deliveryCompleted && (
                      <div style={{ marginTop: 8 }}>
                        <Space direction="vertical" size="small">
                          <Text>
                            <CheckCircleOutlined /> Nhiệt độ: {log.temperature}°C
                          </Text>
                          <Text>
                            <DashboardOutlined /> Độ ẩm: {log.humidity}%
                          </Text>
                          <Text>
                            <EnvironmentOutlined /> Vị trí: {log.location}
                          </Text>
                          {log.notes && <Text>Ghi chú: {log.notes}</Text>}
                        </Space>
                      </div>
                    )}
                  </Timeline.Item>
                ))}
                
                {selectedLogistics.arrivedAt && (
                  <Timeline.Item 
                    dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}
                    color="green"
                  >
                    <Text strong>Kết thúc vận chuyển</Text>
                    <div>{new Date(selectedLogistics.arrivedAt).toLocaleString('vi-VN')}</div>
                  </Timeline.Item>
                )}
              </Timeline>
            </>
          )}
        </Modal>

        {/* Modal cập nhật dữ liệu vận chuyển */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PlusOutlined style={{ marginRight: 8 }} />
              <span>Cập nhật dữ liệu vận chuyển</span>
            </div>
          }
          open={dataModalVisible}
          onCancel={handleDataModalCancel}
          footer={null}
          width={600}
        >
          {selectedLogistics && (
            <Form
              form={dataForm}
              layout="vertical"
              onFinish={handleAddLogisticsData}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Nhiệt độ (°C)"
                    name="temperature"
                    rules={[{ required: true, message: 'Vui lòng nhập nhiệt độ' }]}
                  >
                    <InputNumber
                      min={-50}
                      max={100}
                      style={{ width: '100%' }}
                      placeholder="Ví dụ: 25.5"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Độ ẩm (%)"
                    name="humidity"
                    rules={[{ required: true, message: 'Vui lòng nhập độ ẩm' }]}
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      style={{ width: '100%' }}
                      placeholder="Ví dụ: 60"
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                label="Vị trí hiện tại"
                name="location"
                rules={[{ required: true, message: 'Vui lòng nhập vị trí hiện tại' }]}
              >
                <Input placeholder="Ví dụ: Km15 đường cao tốc Hà Nội - Hải Phòng" />
              </Form.Item>
              
              <Form.Item
                label="Tọa độ GPS"
                name="gpsCoordinates"
              >
                <Input placeholder="Ví dụ: 21.0285,105.8542" />
              </Form.Item>
              
              <Form.Item
                label="Ghi chú"
                name="notes"
              >
                <TextArea rows={3} placeholder="Thông tin bổ sung..." />
              </Form.Item>
              
              <Form.Item
                name="deliveryCompleted"
                valuePropName="checked"
              >
                <Select placeholder="Trạng thái giao hàng">
                  <Option value={false}>Đang vận chuyển</Option>
                  <Option value={true}>Đã giao hàng</Option>
                </Select>
              </Form.Item>
              
              <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                <Space>
                  <Button onClick={handleDataModalCancel}>Hủy</Button>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    Cập nhật
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </ProCard>
    </PageContainer>
  );
};

export default AllLogistics; 