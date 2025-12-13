import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import MainLayout from './MainLayout';

const PrivateRoute = ({ roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles prop provided, check user role
  if (roles && !roles.includes(user.role)) {
    return <div style={{ padding: 20 }}>Forbidden — you don't have permission to view this page.</div>;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PrivateRoute;
