import React, { useEffect, useState } from 'react';

const Main = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', back: false, hideMenu: false });
  }, [setOption]);
  return <div className="header-zindex">main page</div>;
};
export default Main;
