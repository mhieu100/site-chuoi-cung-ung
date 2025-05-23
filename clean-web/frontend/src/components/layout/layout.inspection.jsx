import { ProLayout } from '@ant-design/pro-components';
import { ConnectButton } from '@ant-design/web3';
import { 
  SafetyOutlined, 
  DashboardOutlined, 
  UserOutlined,
  FileSearchOutlined,
  UnorderedListOutlined,
  CarOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Dropdown, message, Tag } from 'antd';
import { useDisconnect } from 'wagmi';
import { callLogout } from '../../api/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';

const LayoutInspection = () => {
  const { user } = useSelector((state) => state.account);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  // Menu items for the inspection layout
  const menuItems = [
    {
      path: '/inspection/dashboard',
      name: 'Bảng điều khiển',
      icon: <DashboardOutlined />,
    },
    {
      path: '/inspection/all-inspection',
      name: 'Danh sách lô hàng cần kiểm định',
      icon: <UnorderedListOutlined />,
    },
    {
      path: '/inspection/profile',
      name: 'Tài khoản',
      icon: <UserOutlined />,
    },
  ];

  const handleLogout = async () => {
    try {
      // First disconnect the wallet
      disconnect();
      
      // Call the logout API but don't wait for response to show success
      callLogout().catch(error => {
        console.error('Logout API error:', error);
        // No message here - we'll show success regardless
      });
      
      // Clear the local state
      dispatch(setLogoutAction({}));
      
      // Show single success message
      message.success('Đăng xuất thành công');
      
      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Đăng xuất thất bại');
    }
  };

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      label: 'Hồ sơ',
      onClick: () => navigate('/inspection/profile'),
    },
   
    {
      key: 'logout',
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <ProLayout
      title="AgriTrace Inspector"
      logo="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
      fixSiderbar
      fixedHeader
      layout="mix"
      contentWidth="Fluid"
      navTheme="light"
      headerTheme="light"
      primaryColor="#722ed1" // Purple theme for inspectors
      location={{
        pathname,
      }}
      menu={{
        locale: false,
      }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path);
            navigate(item.path);
          }}
        >
          {dom}
        </a>
      )}
      menuDataRender={() => menuItems}
      headerContentRender={() => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tag color="#722ed1" style={{ marginLeft: 20 }}>
            <SafetyOutlined /> Thanh Tra Viên
          </Tag>
        </div>
      )}
      avatarProps={{
        src: <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" />,
        size: 'small',
        title: user?.fullname || 'Inspector',
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: userMenuItems,
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
    
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutInspection; 