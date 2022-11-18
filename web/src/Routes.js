import React, { Suspense, useEffect, lazy } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import RouteSwitch from './RouteSwitch';
import Loading from 'components/atoms/Loading';

// import useAuth from 'hooks/useAuth';
// const SignIn = lazy(() => import('pages/Connect/Login/index'));
// const SignUp = lazy(() => import('pages/Connect/Register/index'));

const Routers = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/list') document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/*" element={<RouteSwitch />} />
        {/*<Route path="/connect" element={<SignIn />} />*/}
        {/*<Route path="/connect/register" element={<SignUp />} />*/}
      </Routes>
    </Suspense>
  );
};

export default Routers;
