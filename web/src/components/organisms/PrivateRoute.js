import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_INFO, getLocalItem } from 'utils/localStorage';

const PrivateRoute = ({ outlet }) => {
  const location = useLocation();
  const authInfo = getLocalItem(AUTH_INFO);
  return authInfo?.token ? outlet : <Navigate to={{ pathname: '/login' }} replace state={{ ...location.state, from: location.pathname }} />;
};
export default PrivateRoute;
