import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'state';

const PrivateRoute = ({ outlet }) => {
  const location = useLocation();
  console.log('navigate', location);
  const auth = useRecoilValue(authAtom);
  return auth ? outlet : <Navigate to={{ pathname: '/login' }} replace state={{ from: location.pathname }} />;
};
export default PrivateRoute;
