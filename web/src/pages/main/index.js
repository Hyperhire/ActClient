import React, { lazy, useEffect, useState } from 'react';
const Footer = lazy(() => import('components/organisms/Footer'));

const Main = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', back: false, menu: true });
    return () => setOption({});
  }, [setOption]);
  return (
    <div className="flex-auto">
      <div className="">main page</div>
      <Footer />
    </div>
  );
};
export default Main;
