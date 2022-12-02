import React, { Suspense, useEffect, lazy } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import RouteSwitch from './RouteSwitch';
import ActSpinner from 'components/atoms/ActSpinner';

const Routers = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/list') document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return (
    <Suspense fallback={<ActSpinner />}>
      <Routes>
        <Route path="/*" element={<RouteSwitch />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
