import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'state';

const PrivateRoute = ({ outlet }) => {
  const location = useLocation();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    console.log('auth', auth);
  }, [auth]);
  return auth?.authenticated ? outlet : <Navigate to={{ pathname: '/login' }} replace state={{ ...location.state, to: location.pathname }} />;
};
export default PrivateRoute;
