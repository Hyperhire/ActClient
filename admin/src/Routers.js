import React, { Suspense, useEffect, useContext, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import RouteSwitch from './RouteSwitch';
import ActSpinner from 'components/atoms/ActSpinner';
import { TokenContext } from './utils/TokenContext';

const Routers = () => {
  const location = useLocation();
  const { reIssueToken } = useContext(TokenContext);
  const [loginCheck, setLoginCheck] = useState(false);
  useEffect(() => {
    reIssueToken().then(() => {
      setLoginCheck(true);
    });
  }, []);

  useEffect(() => {
    if (location.pathname !== '/list') document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return loginCheck ? (
    <Suspense fallback={<ActSpinner />}>
      <Routes>
        <Route path="/*" element={<RouteSwitch />} />
      </Routes>
    </Suspense>
  ) : (
    <ActSpinner />
  );
};

export default Routers;
