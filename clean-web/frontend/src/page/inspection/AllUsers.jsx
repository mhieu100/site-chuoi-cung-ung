import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Input, Space, message, Tooltip, Modal, Descriptions, Avatar, Divider, Row, Col } from 'antd';
import { SearchOutlined, UserOutlined, EyeOutlined, MailOutlined, PhoneOutlined, HomeOutlined, WalletOutlined, CalendarOutlined } from '@ant-design/icons';
import { getAllUsers, getUsersByRole } from '../../api/api.user';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [userDetailModalVisible, setUserDetailModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (role = null) => {
    setLoading(true);
    try {
      let response;
      if (role) {
        response = await getUsersByRole(role);
        setSelectedRole(role);
      } else {
        response = await getAllUsers();
        
        setSelectedRole(null);
      }
      const userData = response || [];
      console.log(response)
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.fullname?.toLowerCase().includes(value.toLowerCase()) ||
        user.email?.toLowerCase().includes(value.toLowerCase()) ||
        user.walletAddress?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleRoleFilter = (role) => {
    fetchUsers(role);
  };

  const showUserDetail = (user) => {
    setSelectedUser(user);
    setUserDetailModalVisible(true);
  };

  const handleCloseUserDetailModal = () => {
    setUserDetailModalVisible(false);
    setSelectedUser(null);
  };

  const getRoleTag = (role) => {
    switch (role) {
      case 'FARMER':
        return <Tag color="green">Nông dân</Tag>;
      case 'TRANSPORTER':
        return <Tag color="blue">Vận chuyển</Tag>;
      case 'INSPECTOR':
        return <Tag color="purple">Thanh tra</Tag>;
      default:
        return <Tag color="default">{role}</Tag>;
    }
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text, record) => (
        <Space>
          <UserOutlined />
          {text || 'Chưa cập nhật'}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md'],
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      responsive: ['md'],
      render: (text) => text || 'Chưa cập nhật',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      responsive: ['lg'],
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : 'Chưa cập nhật',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg'],
      render: (text) => text || 'Chưa cập nhật',
    },
    {
      title: 'Địa chỉ ví',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      responsive: ['lg'],
      render: (text) => (
        <Tooltip title={text}>
          <span>{text ? `${text.substring(0, 6)}...${text.substring(text.length - 4)}` : ''}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => getRoleTag(role),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showUserDetail(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Quản lý người dùng"
        extra={
          <Space>
            <Input
              placeholder="Tìm kiếm người dùng"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
            <Button
              type={selectedRole === 'FARMER' ? 'primary' : 'default'}
              onClick={() => handleRoleFilter('FARMER')}
            >
              Nông dân
            </Button>
            <Button
              type={selectedRole === 'TRANSPORTER' ? 'primary' : 'default'}
              onClick={() => handleRoleFilter('TRANSPORTER')}
            >
              Vận chuyển
            </Button>
            <Button
              type={selectedRole === 'INSPECTOR' ? 'primary' : 'default'}
              onClick={() => handleRoleFilter('INSPECTOR')}
            >
              Thanh tra
            </Button>
            {selectedRole && (
              <Button onClick={() => fetchUsers()}>Tất cả</Button>
            )}
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="walletAddress"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* User Detail Modal */}
      <Modal
        title="Thông tin chi tiết người dùng"
        open={userDetailModalVisible}
        onCancel={handleCloseUserDetailModal}
        footer={[
          <Button key="close" onClick={handleCloseUserDetailModal}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {selectedUser && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 20 }}>
                <Avatar size={80} icon={<UserOutlined />} />
                <h2 style={{ marginTop: 16, marginBottom: 0 }}>{selectedUser.fullname || 'Chưa cập nhật'}</h2>
                <Tag color={selectedUser.role === 'FARMER' ? 'green' : selectedUser.role === 'TRANSPORTER' ? 'blue' : 'purple'}>
                  {selectedUser.role === 'FARMER' ? 'Nông dân' : selectedUser.role === 'TRANSPORTER' ? 'Vận chuyển' : 'Thanh tra'}
                </Tag>
              </Col>
            </Row>

            <Divider />

            <Descriptions bordered column={1}>
              <Descriptions.Item label={<><MailOutlined /> Email</>}>
                {selectedUser.email || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined /> Số điện thoại</>}>
                {selectedUser.phoneNumber || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> Ngày sinh</>}>
                {selectedUser.birthday ? moment(selectedUser.birthday).format('DD/MM/YYYY') : 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label={<><HomeOutlined /> Địa chỉ</>}>
                {selectedUser.address || 'Chưa cập nhật'}
              </Descriptions.Item>
              <Descriptions.Item label={<><WalletOutlined /> Địa chỉ ví</>}>
                <Tooltip title="Copy to clipboard">
                  <Tag color="blue" style={{ cursor: 'pointer' }} onClick={() => {
                    navigator.clipboard.writeText(selectedUser.walletAddress);
                    message.success('Đã sao chép địa chỉ ví!');
                  }}>
                    {selectedUser.walletAddress}
                  </Tag>
                </Tooltip>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </>
  );
};

export default AllUsers;
