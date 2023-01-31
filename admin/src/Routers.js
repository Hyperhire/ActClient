import React, { Suspense, useEffect, useContext, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import RouteSwitch from './RouteSwitch';
import ActSpinner from 'components/atoms/ActSpinner';
import { TokenContext } from './utils/TokenContext';

const Routers = () => {
  const { reIssueToken } = useContext(TokenContext);
  const [loginCheck, setLoginCheck] = useState(false);
  useEffect(() => {
    reIssueToken().then(() => {
      setLoginCheck(true);
    });
  }, []);

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
