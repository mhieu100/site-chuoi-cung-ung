import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutClient from './components/layout/layout.client';
import LayoutLogistics from './components/layout/layout.logistics';
import LayoutInspection from './components/layout/layout.inspection';
import NotFound from './page/not.found';
import HomePage from './page/client/home';
import ProfilePage from './page/auth/profile';
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/Register';
import AboutPage from './page/client/about';
import ContactPage from './page/client/contact';
import ProductPage from './page/client/product';
import BlogPage from './page/client/blog';
import StorePage from './page/client/store';
import { fetchAccount } from './redux/slice/accountSlide';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import NewProductPage from './page/client/new.product';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import ForbiddenPage from './page/forbidden';

// Import logistics pages
import LogisticsDashboard from './page/logistics/LogisticsDashboard';
import LogisticsReports from './page/logistics/LogisticsReports';
import TransportRequests from './page/logistics/TransportRequests';
import AllLogistics from './page/logistics/AllLogistics';

// Import inspection pages
import InspectionDashboard from './page/inspection/InspectionDashboard';
import InspectionAll from './page/inspection/InspectionAll';
import InspectionPage from './page/inspection/InspectionPage';
import ProductionStepPage from './page/client/production.step';

// Create a new role-based route component 
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || !user.walletAddress) {
      // Silently redirect to login without message
      navigate('/login', { state: { from: location } });
    } else if (user.role && !allowedRoles.includes(user.role)) {
      // Redirect to forbidden page for farmers and other unauthorized roles
      navigate('/forbidden', {
        state: {
          fromDirectAccess: true,
          attemptedPath: location.pathname
        }
      });
    }
  }, [user, allowedRoles, navigate, location]);

  if (!user || !user.walletAddress) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role && !allowedRoles.includes(user.role)) {
    return null;
  }

  return children;
};

function App() {

  const dispatch = useDispatch();
  const { address } = useAccount();
  useEffect(() => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount(address));
  }, [address, dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (

        <LayoutClient />
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element: <HomePage />
        },
        {
          path: 'about', element: <AboutPage />
        },
        {
          path: 'contact', element: <ContactPage />
        },
        {
          path: 'product/:productLotId', element: <ProductPage />
        },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          )
        },
        {
          path: 'blog', element: <BlogPage />
        },
        {
          path: 'store', element: <StorePage />
        },
        {
          path: 'newproduct',
          element: (
            <PrivateRoute>
              <NewProductPage />
            </PrivateRoute>
          )
        },   
        {
          path: 'production-steps/:productLotId',
          element:  <PrivateRoute><ProductionStepPage /></PrivateRoute>,
        },
      ],
    },
    {
      path: '/logistics-portal',
      element: (
        <RoleBasedRoute allowedRoles={['TRANSPORTER']}>
          <LayoutLogistics />
        </RoleBasedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <LogisticsDashboard />,
        },
        {
          path: 'dashboard',
          element: <LogisticsDashboard />,
        },
        {
          path: 'transport-requests',
          element: <TransportRequests />,
        },

        {
          path: 'all-logistics',
          element: <AllLogistics />,
        },
        {
          path: 'reports',
          element: <LogisticsReports />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
      ],
    },

    {
      path: '/inspection',
      element: (
        <RoleBasedRoute allowedRoles={['INSPECTOR']}>
          <LayoutInspection />
        </RoleBasedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <InspectionDashboard />,
        },
        {
          path: 'dashboard',
          element: <InspectionDashboard />,
        },
        {
          path: 'all-inspection',
          element: <InspectionAll />,
        },
        {
          path: 'product/:productLotId',
          element: <InspectionPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
      ],
    },

    {
      path: '/forbidden',
      element: <ForbiddenPage />,
    },

    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
