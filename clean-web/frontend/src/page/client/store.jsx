import React, { useState, useEffect } from 'react'
import { getAllProductLots } from '../../api/api.product'
import { 
  Layout, 
  Typography, 
  Input, 
  Select, 
  Button, 
  Card, 
  Row, 
  Col, 
  Pagination, 
  Spin, 
  Empty, 
  Radio, 
  Space, 
  Divider, 
  Tag,
  Avatar,
  Badge
} from 'antd'
import { 
  SearchOutlined, 
  FilterOutlined, 
  AppstoreOutlined, 
  BarsOutlined, 
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
  LinkOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;

const StorePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    farmerWalletAddress: '',
    status: '',
    cropType: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState([])
  const productsPerPage = 6
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getAllProductLots({
        farmerWalletAddress: filters.farmerWalletAddress,
        status: filters.status,
        cropType: filters.cropType
      })
      setProducts(Array.isArray(response) ? response : [])
      setFilteredProducts(Array.isArray(response) ? response : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleApplyFilters = () => {
    fetchProducts()
    setCurrentPage(1)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalItems = filteredProducts.length

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'CREATED', label: 'Đã tạo' },
    { value: 'PRODUCTION_COMPLETED', label: 'Sản xuất hoàn thành' },
    { value: 'REQUEST_TRANSPORTED', label: 'Yêu cầu vận chuyển' },
    { value: 'TRANSPORTED', label: 'Đã vận chuyển' },
    { value: 'VERIFIED', label: 'Đã kiểm định' },
    { value: 'SOLD', label: 'Đã bán' }
  ]

  const cropTypeOptions = [
    { value: '', label: 'Tất cả loại cây trồng' },
    { value: 'VEGETABLE', label: 'Rau củ' },
    { value: 'FRUIT', label: 'Trái cây' },
    { value: 'CEREAL', label: 'Ngũ cốc' },
    { value: 'BEANS', label: 'Đậu' },
    { value: 'ROOT', label: 'Củ' },
    { value: 'HERB', label: 'Thảo mộc' },
    { value: 'OTHER', label: 'Khác' }
  ]

  // Function to map status to tag colors
  const getStatusTag = (status) => {
    const statusMap = {
      'CREATED': { color: 'blue', label: 'Đã tạo' },
      'PRODUCTION_COMPLETED': { color: 'green', label: 'Sản xuất hoàn thành' },
      'REQUEST_TRANSPORTED': { color: 'orange', label: 'Yêu cầu vận chuyển' },
      'TRANSPORTED': { color: 'purple', label: 'Đã vận chuyển' },
      'VERIFIED': { color: 'gold', label: 'Đã kiểm định' },
      'SOLD': { color: 'geekblue', label: 'Đã bán' }
    };
    
    return statusMap[status] || { color: 'default', label: status };
  }
  
  // Format crop type for display
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

  return (
    <Layout style={{ padding: '0 24px', background: '#f0f2f5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px 0' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>Tất cả sản phẩm</Title>
          <Paragraph type="secondary">
            Khám phá bộ sưu tập sản phẩm nông nghiệp tươi, bền vững từ các trang trại đã được xác minh
          </Paragraph>
        </div>
  
        <div style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Search 
                placeholder="Tìm kiếm sản phẩm..." 
                size="large"
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col xs={18} md={10}>
              <Select
                placeholder="Sắp xếp theo"
                style={{ width: '100%' }}
                size="large"
                defaultValue="popular"
              >
                <Option value="popular">Sắp xếp theo: Nổi bật</Option>
                <Option value="newest">Sắp xếp theo: Mới nhất</Option>
                <Option value="price-asc">Sắp xếp theo: Giá: Thấp đến Cao</Option>
                <Option value="price-desc">Sắp xếp theo: Giá: Cao đến Thấp</Option>
                <Option value="name-asc">Sắp xếp theo: Tên A-Z</Option>
              </Select>
            </Col>
            <Col xs={6} md={2} style={{ textAlign: 'right' }}>
              <Button 
                type="default" 
                size="large" 
                className="md:hidden" 
                icon={<FilterOutlined />}
              >
                Lọc
              </Button>
            </Col>
          </Row>
          </div>
  
        <Row gutter={24}>
          {/* Filter Sidebar */}
          <Col xs={0} md={6} lg={5}>
            <Card title="Bộ lọc" bordered={false} style={{ position: 'sticky', top: 24 }}>
              <div style={{ marginBottom: 24 }}>
                <Title level={5}>Loại cây trồng</Title>
                <Radio.Group 
                  onChange={(e) => handleFilterChange('cropType', e.target.value)}
                  value={filters.cropType}
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                  {cropTypeOptions.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
              
              <Divider />
              
              <div style={{ marginBottom: 24 }}>
                <Title level={5}>Trạng thái sản phẩm</Title>
                <Select
                  placeholder="Chọn trạng thái"
                  style={{ width: '100%' }}
                  value={filters.status}
                  onChange={(value) => handleFilterChange('status', value)}
                >
                  {statusOptions.map((option) => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
                  ))}
                </Select>
            </div>
  
              <Divider />
              
              <div style={{ marginBottom: 24 }}>
                <Title level={5}>Địa chỉ ví nông dân</Title>
                <Input 
                  placeholder="Nhập địa chỉ ví"
                  value={filters.farmerWalletAddress}
                  onChange={(e) => handleFilterChange('farmerWalletAddress', e.target.value)}
                />
            </div>
  
              <Button 
                type="primary" 
                block 
                onClick={handleApplyFilters}
                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                Áp dụng bộ lọc
              </Button>
            </Card>
          </Col>
          
          {/* Product Grid */}
          <Col xs={24} md={18} lg={19}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>
                    {filteredProducts.length > 0 
                      ? `Hiển thị ${indexOfFirstProduct + 1}-${Math.min(indexOfLastProduct, filteredProducts.length)} trong ${filteredProducts.length} sản phẩm`
                      : 'Không tìm thấy sản phẩm nào'
                    }
                  </Text>
                  <Space>
                    <Button 
                      type={viewMode === 'grid' ? 'primary' : 'default'} 
                      icon={<AppstoreOutlined />}
                      onClick={() => setViewMode('grid')}
                      style={viewMode === 'grid' ? { backgroundColor: '#52c41a', borderColor: '#52c41a' } : {}}
                    />
                    <Button 
                      type={viewMode === 'list' ? 'primary' : 'default'} 
                      icon={<BarsOutlined />}
                      onClick={() => setViewMode('list')}
                      style={viewMode === 'list' ? { backgroundColor: '#52c41a', borderColor: '#52c41a' } : {}}
                    />
                  </Space>
            </div>
  
                {currentProducts.length > 0 ? (
                  <>
                    {viewMode === 'grid' ? (
                      <Row gutter={[16, 16]}>
                        {currentProducts.map((product) => (
                          <Col xs={24} sm={12} lg={8} key={product.id}>
                            <Badge.Ribbon 
                              text={getStatusTag(product.status).label} 
                              color={getStatusTag(product.status).color}
                            >
                              <Card
                                hoverable
                                cover={
                                  <div style={{ height: 200, overflow: 'hidden' }}>
                                    <img
                                      alt={product.productName}
                                      src={ `http://localhost:8080/storage/products/${product.imageUrl}`}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                </div>
                                }
                                actions={[
                                  <Link to={`/product/${product.id}`} style={{ color: 'blue' }}>Xem chi tiết</Link>
                                ]}
                              >
                                <Meta
                                  title={product.productName}
                                  description={
                                    <Space direction="vertical" size={2} style={{ width: '100%' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text type="secondary">Loại: {formatCropType(product.cropType)}</Text>
                                        <Text strong>{product.weight} kg</Text>
              </div>
                                      <div>
                                        <Space>
                                          <EnvironmentOutlined style={{ color: '#8c8c8c' }} />
                                          <Text type="secondary">{product.location || 'N/A'}</Text>
                                        </Space>
                </div>
                                      <div>
                                        <Space>
                                          <UserOutlined style={{ color: '#8c8c8c' }} />
                                          <Text type="secondary">{product.farmer?.fullname || 'N/A'}</Text>
                                        </Space>
                </div>
                                      <div>
                                        <Space>
                                          <CalendarOutlined style={{ color: '#8c8c8c' }} />
                                          <Text type="secondary">{new Date(product.harvestDate).toLocaleDateString()}</Text>
                                        </Space>
                </div>
                                    </Space>
                                  }
                                />
                              </Card>
                            </Badge.Ribbon>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        {currentProducts.map((product) => (
                          <Card key={product.id}>
                            <Row gutter={[16, 8]}>
                              <Col xs={24} sm={6}>
                                <div style={{ height: 120, overflow: 'hidden', borderRadius: 8 }}>
                                  <img
                                    alt={product.productName}
                                    src={`http://localhost:8080/storage/products/${product.imageUrl}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
              </div>
                              </Col>
                              <Col xs={24} sm={18}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                  <Title level={4} style={{ margin: 0 }}>{product.productName}</Title>
                                  <Tag color={getStatusTag(product.status).color}>{getStatusTag(product.status).label}</Tag>
            </div>
                                <Row gutter={[16, 8]}>
                                  <Col xs={12}>
                                    <Text type="secondary">Loại: </Text>
                                    <Text>{formatCropType(product.cropType)}</Text>
                                  </Col>
                                  <Col xs={12}>
                                    <Text type="secondary">Trọng lượng: </Text>
                                    <Text strong>{product.weight} kg</Text>
                                  </Col>
                                  <Col xs={12}>
                                    <Space>
                                      <EnvironmentOutlined style={{ color: '#8c8c8c' }} />
                                      <Text>{product.location || 'N/A'}</Text>
                                    </Space>
                                  </Col>
                                  <Col xs={12}>
                                    <Space>
                                      <UserOutlined style={{ color: '#8c8c8c' }} />
                                      <Text>{product.farmer?.fullname || 'N/A'}</Text>
                                    </Space>
                                  </Col>
                                  <Col xs={24}>
                                    <Space>
                                      <CalendarOutlined style={{ color: '#8c8c8c' }} />
                                      <Text>Ngày thu hoạch: {new Date(product.harvestDate).toLocaleDateString()}</Text>
                                    </Space>
                                  </Col>
                                </Row>
                                <div style={{ marginTop: 12 }}>
                                  <Space>
                                    <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>Xem chi tiết</Button>
                                    {product.blockchainTxHash && (
                                      <Button type="link" icon={<LinkOutlined />}>
                                        Blockchain
                                      </Button>
                                    )}
                                  </Space>
          </div>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                      </Space>
                    )}
                    
                    <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                      <Pagination 
                        current={currentPage}
                        pageSize={productsPerPage}
                        total={totalItems}
                        onChange={setCurrentPage}
                        showSizeChanger={false}
                      />
          </div>
                  </>
                ) : (
                  <Empty
                    description="Không tìm thấy sản phẩm nào"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                      Thử điều chỉnh bộ lọc của bạn để xem nhiều sản phẩm hơn
                    </Paragraph>
                  </Empty>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default StorePage