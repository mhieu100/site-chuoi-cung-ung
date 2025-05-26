import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Input, Space, message, Tooltip, Badge, Modal, Descriptions, Image, Divider, Row, Col, Statistic } from 'antd';
import { SearchOutlined, EyeOutlined, CheckCircleOutlined, CalendarOutlined, EnvironmentOutlined, UserOutlined, LinkOutlined, ShoppingOutlined, BarChartOutlined, WalletOutlined } from '@ant-design/icons';
import { getAllProductLots } from '../../api/api.product';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [productDetailModalVisible, setProductDetailModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getAllProductLots(params);
      console.log(response)
      const productData = response || [];
      setProducts(productData);
      setFilteredProducts(productData);
      if (params.status) {
        setSelectedStatus(params.status);
      } else {
        setSelectedStatus(null);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(value.toLowerCase()) ||
        product.id?.toLowerCase().includes(value.toLowerCase()) ||
        product.farmerWalletAddress?.toLowerCase().includes(value.toLowerCase()) ||
        product.cropType?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleStatusFilter = (status) => {
    fetchProducts({ status });
  };

  const showProductDetail = (product) => {
    setSelectedProduct(product);
    setProductDetailModalVisible(true);
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModalVisible(false);
    setSelectedProduct(null);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'CREATED':
        return <Tag color="blue">Đã tạo</Tag>;
      case 'PRODUCTION_COMPLETED':
        return <Tag color="cyan">Sản xuất hoàn thành</Tag>;
      case 'REQUEST_TRANSPORTED':
        return <Tag color="purple">Yêu cầu vận chuyển</Tag>;
      case 'TRANSPORTED':
        return <Tag color="geekblue">Đang vận chuyển</Tag>;
      case 'VERIFIED':
        return <Tag color="green">Đã kiểm định</Tag>;
      case 'SOLD':
        return <Tag color="gold">Đã bán</Tag>;
      case 'PENDING_INSPECTION':
        return <Tag color="orange">Chờ kiểm định</Tag>;
      case 'INSPECTED':
        return <Tag color="green">Đã kiểm định</Tag>;
      case 'COMPLETED':
        return <Tag color="green">Hoàn thành</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      width: 100,
      render: (text) => <Tooltip title={text}><a>{text.substring(0, 8)}...</a></Tooltip>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Loại cây trồng',
      dataIndex: 'cropType',
      key: 'cropType',
      responsive: ['md'],
      render: (cropType) => {
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
      }
    },
    {
      title: 'Nông dân',
      key: 'farmer',
      responsive: ['lg'],
      render: (_, record) => record.farmer?.fullname || 'Không xác định',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      responsive: ['lg'],
    },
    {
      title: 'Khối lượng',
      dataIndex: 'weight',
      key: 'weight',
      responsive: ['md'],
      render: (weight) => `${weight} kg`,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      responsive: ['md'],
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              icon={<EyeOutlined />}
              onClick={() => showProductDetail(record)}
            >
              Chi tiết
            </Button>
          </Tooltip>
          {record.status === 'PENDING_INSPECTION' && (
            <Tooltip title="Kiểm định">
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => navigate(`/inspection/products/${record.id}/inspect`)}
              >
                Kiểm định
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Danh sách sản phẩm"
        extra={
          <Space>
            <Input
              placeholder="Tìm kiếm sản phẩm"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Product Detail Modal */}
      <Modal
        title="Thông tin chi tiết sản phẩm"
        open={productDetailModalVisible}
        onCancel={handleCloseProductDetailModal}
        footer={[
          <Button key="close" onClick={handleCloseProductDetailModal}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        {selectedProduct && (
          <>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  {selectedProduct.imageUrl ? (
                    <Image
                      src={`/api/files/${selectedProduct.imageUrl}`}
                      alt={selectedProduct.productName}
                      style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                      fallback="data:image/png;base64,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"
                    />
                  ) : (
                    <div style={{ width: '100%', height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShoppingOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={24} md={12}>
                <h2>{selectedProduct.productName}</h2>
                {getStatusTag(selectedProduct.status)}
                
                <Divider />
                
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic 
                      title="Khối lượng" 
                      value={selectedProduct.weight} 
                      suffix="kg"
                      prefix={<BarChartOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="Loại cây trồng" 
                      value={(() => {
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
                        return cropTypes[selectedProduct.cropType] || selectedProduct.cropType;
                      })()} 
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Divider />

            <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label={<><UserOutlined /> Nông dân</>}>
                {selectedProduct.farmer?.fullname || 'Không xác định'}
              </Descriptions.Item>
              <Descriptions.Item label={<><WalletOutlined /> Địa chỉ ví</>}>
                <Tooltip title="Copy to clipboard">
                  <Tag color="blue" style={{ cursor: 'pointer' }} onClick={() => {
                    navigator.clipboard.writeText(selectedProduct.farmer?.walletAddress);
                    message.success('Đã sao chép địa chỉ ví!');
                  }}>
                    {selectedProduct.farmer?.walletAddress ? `${selectedProduct.farmer.walletAddress.substring(0, 6)}...${selectedProduct.farmer.walletAddress.substring(selectedProduct.farmer.walletAddress.length - 4)}` : ''}
                  </Tag>
                </Tooltip>
              </Descriptions.Item>
              <Descriptions.Item label={<><EnvironmentOutlined /> Địa điểm</>}>
                {selectedProduct.location || 'Không xác định'}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> Ngày trồng</>}>
                {selectedProduct.plantedDate ? moment(selectedProduct.plantedDate).format('DD/MM/YYYY') : 'Không xác định'}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> Ngày thu hoạch</>}>
                {selectedProduct.harvestDate ? moment(selectedProduct.harvestDate).format('DD/MM/YYYY') : 'Không xác định'}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> Ngày tạo</>}>
                {selectedProduct.createdDate ? moment(selectedProduct.createdDate).format('DD/MM/YYYY HH:mm') : 'Không xác định'}
              </Descriptions.Item>
              <Descriptions.Item label={<><LinkOutlined /> Blockchain Hash</>} span={2}>
                {selectedProduct.blockchainTxHash ? (
                  <Tooltip title="Copy to clipboard">
                    <Tag color="purple" style={{ cursor: 'pointer' }} onClick={() => {
                      navigator.clipboard.writeText(selectedProduct.blockchainTxHash);
                      message.success('Đã sao chép hash!');
                    }}>
                      {selectedProduct.blockchainTxHash}
                    </Tag>
                  </Tooltip>
                ) : 'Không có'}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </>
  );
};

export default AllProducts;
