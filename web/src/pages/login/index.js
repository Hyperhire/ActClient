import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Login = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', subtitle: '', description: '', back: true, menu: true });
  }, [setOption]);
  return (
    <div>
      <Outlet setOption={setOption} />
    </div>
  );
};
export default Login;
