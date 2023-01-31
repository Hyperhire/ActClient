import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom, usersAtom } from 'state';
import ActSpinner from '../atoms/ActSpinner';

const PrivateRoute = ({ outlet, role }) => {
  const location = useLocation();
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(usersAtom);

  if (!auth.authenticated) return <Navigate to="/login" replace state={{ ...location.state, to: location.pathname }} />;
  if (role && !user) return <ActSpinner />;
  if (role && user?.userType !== role) return <Navigate to="/" replace />;

  return outlet;
};
export default PrivateRoute;
