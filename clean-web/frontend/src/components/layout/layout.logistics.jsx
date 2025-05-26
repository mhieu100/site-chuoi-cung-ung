import { ProLayout } from '@ant-design/pro-components';
import { CarOutlined, DashboardOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Dropdown, message } from 'antd';
import { useDisconnect } from 'wagmi';
import { callLogout } from '../../api/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';

const LayoutLogistics = () => {
  const { user } = useSelector((state) => state.account);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const [pathname, setPathname] = useState(location.pathname);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  // Menu items for the logistics layout
  const menuItems = [
    {
      path: '/logistics-portal/transport-requests',
      name: 'Yêu cầu vận chuyển',
      icon: <CarOutlined />,
    },

    {
      path: '/logistics-portal/all-logistics',
      name: 'Tất cả đơn vận chuyển',
      icon: <CarOutlined />,
    },

    {
      path: '/logistics-portal/profile',
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
      onClick: () => navigate('/logistics-portal/profile'),
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <ProLayout
      title="AgriTrace Logistics"
      fixSiderbar
      fixedHeader
      layout="mix"
      contentWidth="Fluid"
      navTheme="light"
      headerTheme="light"
      primaryColor="#52c41a"
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

      avatarProps={{
        src: <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" />,
        size: 'small',
        title: user?.fullname || 'Guest',
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

export default LayoutLogistics; 