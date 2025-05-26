import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import {
  PageContainer,
  ProCard,
  StatisticCard
} from '@ant-design/pro-components';
import {
  Row,
  Col,
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Progress,
  Empty,
  Spin,
  Card,
  Avatar,
  List,
  Tabs,
  Divider,
  message
} from 'antd';
import {
  SafetyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileSearchOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  RiseOutlined,
  LineChartOutlined,
  PieChartOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  CarOutlined,
  ClockCircleOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  WalletOutlined,
  CalendarOutlined,
  SwapOutlined,
  SendOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { getMockDashboardData } from '../../api/api.dashboard';

const { Title, Text, Paragraph } = Typography;
const { Statistic } = StatisticCard;
const { TabPane } = Tabs;

const CombinedDashboard = () => {
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Initialize web3 instance
  const getWeb3Instance = () => {
    if (window.ethereum) {
      return new Web3(window.ethereum);
    } else {
      message.error('Vui lòng cài đặt ví MetaMask để xem lịch sử giao dịch');
      return null;
    }
  };

  // Fetch wallet balance
  const fetchWalletBalance = async () => {
    if (!user?.walletAddress) return;

    try {
      setBalanceLoading(true);
      const web3Instance = getWeb3Instance();
      if (!web3Instance) return;

      const balanceWei = await web3Instance.eth.getBalance(user.walletAddress);
      const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
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

  useEffect(() => {
    fetchDashboardData();
    if (user && user.walletAddress) {
      fetchWalletBalance();
      fetchTransactionHistory();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // In production, this would call the real API endpoints
      const response = await getMockDashboardData();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    'HIGH': 'error',
    'MEDIUM': 'warning',
    'LOW': 'success'
  };

  const priorityLabels = {
    'HIGH': 'Cao',
    'MEDIUM': 'Trung bình',
    'LOW': 'Thấp'
  };

  const statusColors = {
    'IN_TRANSIT': 'processing',
    'DELIVERED': 'success',
    'DELAYED': 'warning',
    'CANCELLED': 'error'
  };

  const statusLabels = {
    'IN_TRANSIT': 'Đang vận chuyển',
    'DELIVERED': 'Đã giao hàng',
    'DELAYED': 'Bị trễ',
    'CANCELLED': 'Đã hủy'
  };

  const inspectionColumns = [
    {
      title: 'Mã SP',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Nông dân',
      dataIndex: 'farmerName',
      key: 'farmerName',
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => date.toLocaleDateString('vi-VN')
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priorityColors[priority]}>
          {priorityLabels[priority]}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<SafetyOutlined />}
          onClick={() => navigate(`/inspection/products/${record.id}`)}
        >
          Kiểm định
        </Button>
      )
    }
  ];

  const logisticsColumns = [
    {
      title: 'Mã VC',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>
          {statusLabels[status]}
        </Tag>
      )
    },
    {
      title: 'Ngày vận chuyển',
      dataIndex: 'departedAt',
      key: 'departedAt',
      render: (date) => date.toLocaleDateString('vi-VN')
    },
    {
      title: 'Điểm đến',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Tiến độ',
      dataIndex: 'completion',
      key: 'completion',
      render: (percent) => (
        <Progress 
          percent={percent} 
          size="small" 
          status={percent === 100 ? "success" : "active"}
        />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/logistics/${record.id}`)}
        >
          Chi tiết
        </Button>
      )
    }
  ];

  if (loading || !dashboardData) {
    return (
      <PageContainer
        title="Bảng điều khiển hệ thống"
        loading={true}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Bảng điều khiển hệ thống"
      subTitle="Tổng quan về hoạt động kiểm định và vận chuyển nông sản"
      header={{
        style: {
          background: 'linear-gradient(120deg, #1890ff 0%, #52c41a 100%)',
          color: '#fff',
          borderRadius: '4px',
          padding: '16px',
          marginBottom: '24px',
        },
      }}
    >
      <Tabs defaultActiveKey="overview" size="large">
        <TabPane 
          tab={<span><DashboardOutlined /> Tổng quan</span>} 
          key="overview"
        >
          <Row gutter={[24, 24]}>
            {/* Inspection Stats */}
            <Col xs={24} sm={12} lg={6}>
              <ProCard>
                <Statistic
                  title="Chờ kiểm định"
                  value={dashboardData.stats.pendingInspections}
                  prefix={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
                />
              </ProCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <ProCard>
                <Statistic
                  title="Đã kiểm định"
                  value={dashboardData.stats.completedInspections}
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                />
              </ProCard>
            </Col>
            
            {/* Logistics Stats */}
            <Col xs={24} sm={12} lg={6}>
              <ProCard>
                <Statistic
                  title="Vận chuyển đang diễn ra"
                  value={dashboardData.stats.activeShipments}
                  prefix={<CarOutlined style={{ color: '#1890ff' }} />}
                />
              </ProCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <ProCard>
                <Statistic
                  title="Vận chuyển hoàn thành"
                  value={dashboardData.stats.completedShipments}
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                />
              </ProCard>
            </Col>

            {/* Blockchain Information */}
            {user && user.walletAddress && (
              <>
                <Col xs={24} sm={12}>
                  <ProCard
                    title={
                      <Space>
                        <WalletOutlined style={{ color: '#722ed1' }} />
                        <span>Thông tin ví</span>
                      </Space>
                    }
                  >
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Card bordered={false}>
                          <Statistic
                            title="Số dư ví"
                            value={walletBalance}
                            precision={4}
                            suffix="ETH"
                            prefix={<WalletOutlined />}
                            loading={balanceLoading}
                          />
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card bordered={false}>
                          <Statistic
                            title="Địa chỉ ví"
                            value={user.walletAddress.substring(0, 10) + '...' + user.walletAddress.substring(user.walletAddress.length - 8)}
                            valueStyle={{ fontSize: '14px' }}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </ProCard>
                </Col>
              </>
            )}
            
            
            <Col span={24}>
              <ProCard
                title={
                  <Space>
                    <SwapOutlined style={{ color: '#722ed1' }} />
                    <span>Lịch sử giao dịch blockchain</span>
                  </Space>
                }
                loading={transactionsLoading}
              >
                {transactions.length > 0 ? (
                  <Table
                    dataSource={transactions}
                    rowKey="hash"
                    size="small"
                    pagination={{ pageSize: 5 }}
                    columns={[
                      {
                        title: 'Hash',
                        dataIndex: 'hash',
                        key: 'hash',
                        render: hash => (
                          <Typography.Text ellipsis style={{ width: 120 }} copyable={{ text: hash }}>
                            {hash.substring(0, 8)}...{hash.substring(hash.length - 6)}
                          </Typography.Text>
                        )
                      },
                      {
                        title: 'Từ',
                        dataIndex: 'from',
                        key: 'from',
                        render: from => (
                          <Typography.Text ellipsis style={{ width: 120 }}>
                            {from.substring(0, 8)}...{from.substring(from.length - 6)}
                          </Typography.Text>
                        )
                      },
                      {
                        title: 'Đến',
                        dataIndex: 'to',
                        key: 'to',
                        render: to => to ? (
                          <Typography.Text ellipsis style={{ width: 120 }}>
                            {to.substring(0, 8)}...{to.substring(to.length - 6)}
                          </Typography.Text>
                        ) : '-'
                      },
                      {
                        title: 'Giá trị',
                        dataIndex: 'value',
                        key: 'value',
                        render: value => `${parseFloat(value).toFixed(4)} ETH`
                      },
                      {
                        title: 'Loại',
                        key: 'type',
                        render: (_, record) => {
                          const isSent = record.from.toLowerCase() === user?.walletAddress?.toLowerCase();
                          return (
                            <Tag color={isSent ? 'volcano' : 'green'}>
                              {isSent ? (
                                <Space>
                                  <SendOutlined />
                                  Gửi
                                </Space>
                              ) : (
                                <Space>
                                  <SwapOutlined />
                                  Nhận
                                </Space>
                              )}
                            </Tag>
                          );
                        }
                      }
                    ]}
                  />
                ) : transactionsLoading ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    <p>Đang tải lịch sử giao dịch...</p>
                  </div>
                ) : (
                  <Empty description="Không tìm thấy giao dịch nào" />
                )}
              </ProCard>
            </Col>
          </Row>
        </TabPane>
        
      
        
      
      </Tabs>
    </PageContainer>
  );
};

export default CombinedDashboard;
