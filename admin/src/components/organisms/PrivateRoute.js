import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'state';
import Header from './Header';

const PrivateRoute = ({ outlet }) => {
  console.log('PrivateRoute', outlet);
  const location = useLocation();
  const auth = useRecoilValue(authAtom);
  if (!auth.authenticated) return <Navigate to="/login" replace state={{ ...location.state, to: location.pathname }} />;
  return (
    <div>
      <Header />
      {outlet}
    </div>
  );
};
export default PrivateRoute;
