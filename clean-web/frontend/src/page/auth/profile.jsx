import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllProductLots } from '../../api/api.product'
import {
  Layout,
  Card,
  Avatar,
  Typography,
  Tag,
  Row,
  Col,
  Statistic,
  Tabs,
  List,
  Button,
  Space,
  Skeleton,
  Empty,
  Divider,
} from 'antd'
import {
  PlusOutlined,
  LinkOutlined,
  EnvironmentOutlined,
  CarOutlined,
  InboxOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  ArrowUpOutlined,
  ShoppingOutlined,
  QrcodeOutlined,
  SafetyOutlined,
  CarryOutOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import LogisticsModal from '../../components/client/LogisticsModal'
import InspectionModal from '../../components/client/InspectionModal'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

const ProfilePage = () => {
  const { user } = useSelector((state) => state.account)
  const [userProducts, setUserProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [logisticsModalVisible, setLogisticsModalVisible] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [inspectionModalVisible, setInspectionModalVisible] = useState(false)
  
  const isFarmer = user?.role === 'FARMER'

  useEffect(() => {
    if (isFarmer && user && user.walletAddress) {
      fetchUserProducts()
    }
  }, [user.walletAddress, isFarmer])

  const fetchUserProducts = async () => {
    try {
      setLoading(true)
      const response = await getAllProductLots({
        farmerWalletAddress: user.walletAddress
      })
      setUserProducts(Array.isArray(response) ? response : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user products:', error)
      setLoading(false)
    }
  }

  const getStatusTag = (status) => {
    const statusMap = {
      'CREATED': { color: 'blue', text: 'Đã tạo' },
      'PRODUCTION_COMPLETED': { color: 'green', text: 'Sản xuất hoàn thành' },
      'REQUEST_TRANSPORTED': { color: 'purple', text: 'Yêu cầu vận chuyển' },
      'TRANSPORTED': { color: 'cyan', text: 'Đang vận chuyển' },
      'VERIFIED': { color: 'gold', text: 'Đã kiểm định' },
      'SOLD': { color: 'geekblue', text: 'Đã bán' },
      'default': { color: 'default', text: status }
    }

    const { color, text } = statusMap[status] || statusMap.default
    return <Tag color={color}>{text}</Tag>
  }

  const formatCropType = (cropType) => {
    const cropTypes = {
      'VEGETABLE': 'Rau củ',
      'FRUIT': 'Trái cây',
      'CEREAL': 'Ngũ cốc',
      'GRAIN': 'Ngũ cốc',
      'BEANS': 'Đậu',
      'ROOT': 'Củ',
      'HERB': 'Thảo mộc',
      'DAIRY': 'Sữa',
      'MEAT': 'Thịt & Gia cầm',
      'OTHER': 'Khác'
    };
    return cropTypes[cropType] || cropType;
  };

  const showLogisticsModal = (productId) => {
    setSelectedProductId(productId);
    setLogisticsModalVisible(true);
  };

  const handleCloseLogisticsModal = () => {
    setLogisticsModalVisible(false);
    setSelectedProductId(null);
  };

  const showInspectionModal = (productId) => {
    setSelectedProductId(productId);
    setInspectionModalVisible(true);
  };

  const handleCloseInspectionModal = () => {
    setInspectionModalVisible(false);
    setSelectedProductId(null);
  };

  const renderAccountInfo = () => (
    <Card title="Thông tin tài khoản">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text type="secondary">Họ và tên</Text>
          <div><Text strong>{user.fullname || 'Chưa cung cấp'}</Text></div>
        </Col>
        <Col span={12}>
          <Text type="secondary">Email</Text>
          <div><Text strong>{user.email || 'Chưa cung cấp'}</Text></div>
        </Col>
        <Col span={12}>
          <Text type="secondary">Số điện thoại</Text>
          <div><Text strong>{user.phone || 'Chưa cung cấp'}</Text></div>
        </Col>
        <Col span={12}>
          <Text type="secondary">Loại tài khoản</Text>
          <div><Text strong>{user.role || 'Chưa xác định'}</Text></div>
        </Col>
        <Col span={12}>
          <Text type="secondary">Ngày sinh</Text>
          <div><Text strong>{user.birthday || 'Chưa cung cấp'}</Text></div>
        </Col>
        {isFarmer && (
          <Col span={24}>
            <Text type="secondary">Địa chỉ ví</Text>
            <div><Text strong>{user.walletAddress || 'Chưa kết nối'}</Text></div>
          </Col>
        )}
        <Col span={24}>
          <Text type="secondary">Địa chỉ</Text>
          <div><Text strong>{user.address || 'Chưa cung cấp'}</Text></div>
        </Col>
      </Row>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" ghost block icon={<UserOutlined />}>
          Chỉnh sửa hồ sơ
        </Button>
      </Space>
    </Card>
  );

  const farmerItems = [
    {
      key: '1',
      label: 'Sản phẩm',
      children: (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={4}>Sản phẩm nông nghiệp của bạn</Title>
            <Button onClick={() => navigate('/newproduct')} type="primary" ghost icon={<PlusOutlined />}>
              Thêm sản phẩm mới
            </Button>
          </div>

          {loading ? (
            <Card>
              <Skeleton active avatar paragraph={{ rows: 4 }} />
            </Card>
          ) : userProducts.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={userProducts}
              renderItem={product => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      icon={<PlusCircleOutlined />}
                      size="small"
                      onClick={() => navigate(`/production-steps/${product.id}`)}
                    >
                      Cập nhật quá trình sản xuất
                    </Button>,
                    <Button
                      type="link"
                      icon={<CarOutlined />}
                      size="small"
                      onClick={() => showLogisticsModal(product.id)}
                    >
                      Xem quá trình vận chuyển
                    </Button>,
                    <Button
                      type="link"
                      icon={<SafetyOutlined />}
                      size="small"
                      onClick={() => showInspectionModal(product.id)}
                      disabled={product.status === 'VERIFIED'}
                    >
                      {product.status === 'VERIFIED' ? 'Đã kiểm định' : 'Kiểm định & Chứng nhận'}
                    </Button>,
                    product.blockchainTxHash && <Button type="link" icon={<LinkOutlined />} size="small">Blockchain</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={64}
                        src={`http://localhost:8080/storage/products/${product.imageUrl}`}
                      />
                    }
                    title={
                      <Space>
                        <Text strong>{product.productName}</Text>
                        {getStatusTag(product.status)}
                      </Space>
                    }
                    description={
                      <Row gutter={[16, 8]}>
                        <Col span={12}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Loại:</Text>
                          <div>{formatCropType(product.cropType)}</div>
                        </Col>
                        <Col span={12}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Trọng lượng:</Text>
                          <div>{product.weight} kg</div>
                        </Col>
                        <Col span={12}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Ngày trồng:</Text>
                          <div>{new Date(product.plantedDate).toLocaleDateString()}</div>
                        </Col>
                        <Col span={12}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Ngày thu hoạch:</Text>
                          <div>{new Date(product.harvestDate).toLocaleDateString()}</div>
                        </Col>
                      </Row>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Card>
              <Empty
                image={<ShoppingOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
                description={
                  <Space direction="vertical" align="center">
                    <Text strong style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.45)' }}>Chưa có sản phẩm nào</Text>
                    <Text type="secondary">Bạn chưa có sản phẩm nông nghiệp nào. Hãy thêm sản phẩm đầu tiên của mình.</Text>
                    <Button onClick={() => navigate('/newproduct')} type="primary" icon={<PlusOutlined />}>Tạo sản phẩm nông nghiệp</Button>
                  </Space>
                }
              />
            </Card>
          )}

          <Divider />

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Số sản phẩm"
                  value={userProducts.length || 0}
                  prefix={<CarryOutOutlined style={{ color: '#52c41a' }} />}
                  suffix={
                    <Text type="success" style={{ fontSize: '12px' }}>
                      <ArrowUpOutlined /> 12% so với tháng trước
                    </Text>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Số lô hàng"
                  value={28}
                  prefix={<InboxOutlined style={{ color: '#faad14' }} />}
                  suffix={
                    <Text type="success" style={{ fontSize: '12px' }}>
                      <ArrowUpOutlined /> 5% so với tháng trước
                    </Text>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Chứng chỉ"
                  value={3}
                  prefix={<SafetyCertificateOutlined style={{ color: '#1677ff' }} />}
                  suffix={
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Hữu cơ, Non-GMO, Fair Trade
                    </Text>
                  }
                />
              </Card>
            </Col>
          </Row>

          <Divider />

          <Card title="Hoạt động gần đây" extra={<a href="#">Xem tất cả →</a>}>
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  icon: <ShoppingOutlined style={{ color: '#52c41a' }} />,
                  title: 'Tạo lô sản phẩm mới',
                  description: 'Cà chua - Giống heirloom (Lô #TF-2025-0628)',
                  time: 'Hôm nay, 10:24 AM'
                },
                {
                  icon: <ShoppingOutlined style={{ color: '#1677ff' }} />,
                  title: 'Hoàn thành giao hàng',
                  description: 'Cho chợ nông sản Portland (12 món)',
                  time: 'Hôm qua, 3:45 PM'
                },
                {
                  icon: <QrcodeOutlined style={{ color: '#faad14' }} />,
                  title: 'Quét mã QR',
                  description: 'Bởi siêu thị Whole Foods - Seattle',
                  time: '2 ngày trước'
                },
                {
                  icon: <SafetyOutlined style={{ color: '#722ed1' }} />,
                  title: 'Cập nhật chứng chỉ',
                  description: 'Gia hạn chứng chỉ hữu cơ USDA được chấp thuận',
                  time: '25 tháng 6, 2025'
                }
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }} icon={item.icon} />
                    }
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <>
                        <div>{item.description}</div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Tài khoản',
      children: (
        <div>
          {renderAccountInfo()}

          <Divider />

          <Card title="Nông trại đã kết nối">
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  name: 'Nông trại hữu cơ Green Valley',
                  role: 'Chủ sở hữu',
                  avatar: 'https://images.unsplash.com/photo-1654624747708-13705c045a4b?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=100&amp;q=80'
                },
                {
                  name: 'Hợp tác xã nông dân Willamette',
                  role: 'Thành viên',
                  avatar: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=100&amp;q=80'
                }
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.name}
                    description={item.role}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" ghost block icon={<PlusCircleOutlined />} style={{ marginTop: 16 }}>
              Kết nối nông trại mới
            </Button>
          </Card>

          <Divider />

          <Card title="Xuất dữ liệu">
            <Paragraph>Tải xuống dữ liệu hoạt động nông nghiệp và chuỗi cung ứng để lưu trữ hoặc phân tích.</Paragraph>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button block icon={<FileExcelOutlined />}>
                Xuất dạng CSV
              </Button>
              <Button block icon={<FilePdfOutlined />}>
                Xuất dạng PDF
              </Button>
            </Space>
          </Card>
        </div>
      )
    }
  ];

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <div style={{
          background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
          padding: '32px 0',
          marginBottom: 24
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <Row gutter={24} align="middle">
              <Col xs={24} md={6} style={{ textAlign: 'center' }}>
                <Avatar
                  size={120}
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
                  style={{ border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </Col>
              <Col xs={24} md={18}>
                <Title level={2} style={{ marginBottom: 8 }}>
                  {user.fullname || 'User Name'}
                </Title>
                <Space align="center" style={{ marginBottom: 16 }}>
                  <Tag color="green">{user.role || 'User'}</Tag>
                  <Text>
                    <EnvironmentOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    {user.address || 'Location'}
                  </Text>
                </Space>
                {isFarmer && (
                  <Paragraph style={{ maxWidth: 600 }}>
                    Nông dân trồng rau hữu cơ từ năm 2018. Chuyên về cà chua heirloom và rau xanh. Cam kết với các phương pháp bền vững và chuỗi cung ứng minh bạch.
                  </Paragraph>
                )}
              </Col>
            </Row>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 24 }}>
          {isFarmer ? (
            <Tabs defaultActiveKey="1" items={farmerItems} size="large" />
          ) : (
            <div>
              {renderAccountInfo()}
            </div>
          )}
        </div>

        {/* Logistics Modal */}
        <LogisticsModal
          visible={logisticsModalVisible}
          onClose={handleCloseLogisticsModal}
          productId={selectedProductId}
        />

        <InspectionModal
          visible={inspectionModalVisible}
          onClose={handleCloseInspectionModal}
          productId={selectedProductId}
        />
      </Content>
    </Layout>
  )
}

export default ProfilePage