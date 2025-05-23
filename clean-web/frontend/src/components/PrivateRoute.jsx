import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * PrivateRoute component that checks if user is authenticated
 * and redirects to login page if not
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children The component to render if authenticated
 * @returns {React.ReactNode} The children if authenticated, otherwise redirect to login
 */
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.account);
  const location = useLocation();

  if (!user || !user.walletAddress) {
    // Save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 