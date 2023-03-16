import { Navigate, useLocation, Outlet } from 'react-router-dom';
import React from 'react';

import { useAuth } from '../hooks/useAuth';

function WithAuth() {
  const location = useLocation();
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/sign-in" state={{ from: location }} replace />;
}

export { WithAuth };
