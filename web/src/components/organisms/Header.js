import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = ({ title }) => {
  return (
    <div>
      <div>{title}</div>
      <Outlet />
    </div>
  );
};
export default Header;
