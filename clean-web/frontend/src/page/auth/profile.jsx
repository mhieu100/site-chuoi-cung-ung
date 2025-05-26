import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductLots } from '../../api/api.product'
import { updateUser, getUserByWalletAddress } from '../../api/api.user'
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
  Tooltip,
  message,
  Modal,
  Form,
  Input,
  DatePicker
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
  CarryOutOutlined,
  SendOutlined,
  SwapOutlined,
  WalletOutlined,
  LoadingOutlined,
  CopyOutlined,
  SaveOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import LogisticsModal from '../../components/client/LogisticsModal'
import InspectionModal from '../../components/client/InspectionModal'
import Web3 from 'web3'
import moment from 'moment'
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { fetchAccount, updateUserInfo } from '../../redux/slice/accountSlide';

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { TabPane } = Tabs

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  message.success('Đã sao chép!');
};

const ProfilePage = () => {
  const { user } = useSelector((state) => state.account)

  const dispatch = useDispatch()
  const [userProducts, setUserProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [transactionsLoading, setTransactionsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [walletBalance, setWalletBalance] = useState('0')
  const [balanceLoading, setBalanceLoading] = useState(false)
  const navigate = useNavigate()
  const [logisticsModalVisible, setLogisticsModalVisible] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [inspectionModalVisible, setInspectionModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editForm] = Form.useForm()
  const [updating, setUpdating] = useState(false)

  const isFarmer = user?.role === 'FARMER'

  // Initialize web3 instance
  const getWeb3Instance = () => {
    if (window.ethereum) {
      return new Web3(window.ethereum);
    } else {
      message.error('Vui lòng cài đặt ví MetaMask để xem lịch sử giao dịch');
      return null;
    }
  };

  useEffect(() => {
    dispatch(fetchAccount(user.walletAddress))
    if (user && user.walletAddress) {
      if (isFarmer) {
        fetchUserProducts();
      }
      fetchWalletBalance();
      fetchTransactionHistory();
    }
  }, [user?.walletAddress, isFarmer])

  // Fetch wallet balance
  const fetchWalletBalance = async () => {
    if (!user?.walletAddress) return;

    try {
      setBalanceLoading(true);
      const web3Instance = getWeb3Instance();
      if (!web3Instance) return;

      const balanceWei = await web3Instance.eth.getBalance(user.walletAddress);
      const balanceEth = Number(web3Instance.utils.fromWei(balanceWei, 'ether')).toFixed(2);
      setWalletBalance(balanceEth);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    } finally {
      setBalanceLoading(false);
    }
  };

  // Dynamic transaction history function for Ganache
  const fetchTransactionHistory = async () => {
    if (!user?.walletAddress) return;

    try {
      setTransactionsLoading(true);
      const web3Instance = getWeb3Instance();
      if (!web3Instance) return;

      // Get transaction count for the address
      const txCount = await web3Instance.eth.getTransactionCount(user.walletAddress);
      console.log(`Found ${txCount} transactions for address ${user.walletAddress}`);

      // Tạo mảng để lưu chi tiết các giao dịch
      const transactionList = [];

      // Lấy block number hiện tại
      const latestBlock = await web3Instance.eth.getBlockNumber();

      // Duyệt qua tất cả các block để tìm giao dịch liên quan đến walletAddress
      for (let blockNumber = 0; blockNumber <= latestBlock; blockNumber++) {
        const block = await web3Instance.eth.getBlock(blockNumber, true); // true để lấy chi tiết giao dịch
        if (block && block.transactions) {
          block.transactions.forEach((tx) => {
            if (
              tx.from.toLowerCase() === user.walletAddress.toLowerCase() ||
              tx.to?.toLowerCase() === user.walletAddress.toLowerCase()
            ) {
              transactionList.push({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: web3Instance.utils.fromWei(tx.value, 'ether'), // Chuyển đổi từ Wei sang Ether
                gas: tx.gas,
                gasPrice: web3Instance.utils.fromWei(tx.gasPrice, 'gwei'), // Chuyển đổi gasPrice sang Gwei
                blockNumber: tx.blockNumber,
                timestamp: block.timestamp, // Thời gian của block
              });
            }
          });
        }
      }

      // Cập nhật state transactions với danh sách giao dịch
      setTransactions(transactionList);
      console.log('Transaction list:', transactionList);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      message.error('Không thể tải lịch sử giao dịch');
    } finally {
      setTransactionsLoading(false);
    }
  };

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

  // Mở modal chỉnh sửa hồ sơ
  const showEditModal = () => {
    editForm.setFieldsValue({
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday ? moment(user.birthday) : null,
      address: user.address
    });
    setEditModalVisible(true);
  };

  // Xử lý khi người dùng lưu thông tin
  const handleUpdateUser = async (values) => {
    if (!user?.walletAddress) {
      message.error('Không tìm thấy địa chỉ ví!');
      return;
    }

    try {
      setUpdating(true);
      const userData = {
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null
      };

      // Update the user data on the server
      await updateUser(user.walletAddress, userData);
      
      // Reload the account data directly from the API
      await dispatch(fetchAccount());
      
      // Close the modal and show success message
      message.success('Cập nhật thông tin thành công!');
      setEditModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      message.error('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
    } finally {
      setUpdating(false);
    }
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
          <div><Text strong>{user.phoneNumber || 'Chưa cung cấp'}</Text></div>
        </Col>
        <Col span={12}>
          <Text type="secondary">Loại tài khoản</Text>
          <div><Text strong>{user.role || 'Chưa xác định'}</Text></div>
        </Col>
        <Col span={12}>
          <Text type="secondary">Ngày sinh</Text>
          <div>
            <Text strong>
              {user.birthday ? format(new Date(user.birthday), 'dd/MM/yyyy', { locale: vi }) : 'Chưa cung cấp'}
            </Text>
          </div>
        </Col>
        {user?.walletAddress && (
          <>
            <Col span={24}>
              <Text type="secondary">Địa chỉ ví</Text>
              <div>
                <Space>
                  <Text strong copyable>{user.walletAddress}</Text>
                  <Button
                    type="link"
                    size="small"
                    icon={<LinkOutlined />}
                    onClick={() => window.open(`https://etherscan.io/address/${user.walletAddress}`, '_blank')}
                    style={{ padding: 0 }}
                  />
                </Space>
              </div>
            </Col>
            <Col span={24}>
              <Text type="secondary">Số dư ví</Text>
              <div>
                {balanceLoading ? (
                  <Space>
                    <LoadingOutlined />
                    <Text type="secondary">Đang tải...</Text>
                  </Space>
                ) : (
                  <Space>
                    <Text strong>{walletBalance} ETH</Text>
                    <Button
                      type="link"
                      size="small"
                      icon={<SwapOutlined />}
                      onClick={fetchWalletBalance}
                      style={{ padding: 0 }}
                    />
                  </Space>
                )}
              </div>
            </Col>
          </>
        )}
        <Col span={24}>
          <Text type="secondary">Địa chỉ</Text>
          <div><Text strong>{user.address || 'Chưa cung cấp'}</Text></div>
        </Col>
      </Row>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button 
          type="primary" 
          ghost 
          block 
          icon={<UserOutlined />} 
          onClick={showEditModal}
        >
          Chỉnh sửa hồ sơ
        </Button>
      </Space>
    </Card>
  );

  const farmerItems = [
    
    {
      key: '1',
      label: 'Tài khoản',
      children: (
        <div>
          {renderAccountInfo()}

          <Divider />
        </div>
      )
    },
    {
      key: '2',
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
                    >
                      Kiểm định & Chứng nhận
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
                  title="Số dư ví"
                  value={walletBalance}
                  precision={4}
                  prefix={<WalletOutlined style={{ color: '#1677ff' }} />}
                  suffix="ETH"
                  loading={balanceLoading}
                />
              </Card>
            </Col>
          </Row>

          <Divider />

          <Card
            title="Lịch sử giao dịch ETH"
            extra={<Button type="link" onClick={fetchTransactionHistory} disabled={transactionsLoading}>Làm mới</Button>}
          >
            {transactionsLoading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <LoadingOutlined style={{ fontSize: 24 }} />
                <p>Đang tải lịch sử giao dịch...</p>
              </div>
            ) : transactions.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={transactions}
                renderItem={(tx) => (
                  <List.Item
                    actions={[
                      <Tooltip title="Sao chép mã giao dịch">
                        <Button
                          type="link"
                          size="small"
                          icon={<CopyOutlined />}
                          onClick={() => copyToClipboard(tx.hash)}
                        />
                      </Tooltip>,
                      <Tooltip title="Xem trên Etherscan">
                        <Button
                          type="link"
                          size="small"
                          icon={<LinkOutlined />}
                          onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? '#ff4d4f' : '#52c41a',
                          }}
                          icon={tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? <SendOutlined /> : <WalletOutlined />}
                        />
                      }
                      title={
                        <Space>
                          <Text strong>
                            {tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? 'Gửi' : 'Nhận'} {parseFloat(tx.value).toFixed(4)} ETH
                          </Text>
                          <Tag color={tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? 'red' : 'green'}>
                            {tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? 'Gửi' : 'Nhận'}
                          </Tag>
                        </Space>
                      }
                      description={
                        <div>
                          <Paragraph style={{ marginBottom: 4 }}>
                            <Text type="secondary">
                              {tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? 'Đến: ' : 'Từ: '}
                              <Text
                                code
                                copyable={{ text: tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? tx.to : tx.from }}
                                style={{ fontSize: '13px' }}
                              >
                                {(tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? tx.to : tx.from).slice(0, 6)}...
                                {(tx.from.toLowerCase() === user.walletAddress.toLowerCase() ? tx.to : tx.from).slice(-4)}
                              </Text>
                            </Text>
                          </Paragraph>
                          <Paragraph style={{ marginBottom: 4 }}>
                            <Text type="secondary">
                              Phí giao dịch:{' '}
                              {(Number(tx.gas) * Number(tx.gasPrice) / 1e9).toFixed(6)} ETH
                            </Text>
                          </Paragraph>
                          <Paragraph style={{ marginBottom: 4 }}>
                            <Text type="secondary">
                              Block: {tx.blockNumber} | Thời gian:{' '}
                              {format(new Date(Number(tx.timestamp) * 1000), 'dd/MM/yyyy HH:mm:ss', { locale: vi })}
                            </Text>
                          </Paragraph>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                description={
                  <span>
                    Không tìm thấy giao dịch nào. <br />
                    <Text type="secondary">Hãy thực hiện một giao dịch để bắt đầu!</Text>
                  </span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          
          </Card>
        </div>
      ),
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

        {/* Modal chỉnh sửa thông tin người dùng */}
        <Modal
          title="Chỉnh sửa thông tin cá nhân"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null}
          destroyOnClose
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleUpdateUser}
            initialValues={{
              fullname: user?.fullname,
              email: user?.email,
              phoneNumber: user?.phoneNumber,
              birthday: user?.birthday ? moment(user.birthday) : null,
              address: user?.address
            }}
          >
            <Form.Item
              name="fullname"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Email không hợp lệ' },
                { required: true, message: 'Vui lòng nhập email' }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="birthday"
              label="Ngày sinh"
            >
              <DatePicker 
                style={{ width: '100%' }} 
                placeholder="Chọn ngày sinh"
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
            >
              <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                icon={<SaveOutlined />}
                loading={updating}
              >
                Lưu thông tin
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}

export default ProfilePage