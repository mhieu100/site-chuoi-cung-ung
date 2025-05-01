import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutClient from './components/layout/layout.client';
import LayoutAdmin from './components/layout/layout.admin';
import NotFound from './page/not.found';
import HomePage from './page/client/home';
import ProfilePage from './page/auth/profile';
import DashboardPage from './page/admin/dashboard';
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/Register';
import AboutPage from './page/client/about';
import ContactPage from './page/client/contact';
import ProductPage from './page/client/product';
import BlogPage from './page/client/blog';
import StorePage from './page/client/store';


function App() {
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
          path: 'product', element: <ProductPage />
        },
        {
          path: 'profile', element: <ProfilePage />
        },
        {
          path: 'blog', element: <BlogPage />
        },
        {
          path: 'store', element: <StorePage />
        }
      ],
    },

    {
      path: '/admin',
      element: (
        <LayoutAdmin />
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
      ],
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
