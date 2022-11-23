import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Login = ({ setOption }) => {
  return (
    <div className="max-width max-height">
      <Outlet setOption={setOption} />
    </div>
  );
};
export default Login;
