import React, { useEffect, useState } from 'react';

const Disclosure = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '단체 공시', back: true, hideMenu: false });
  }, [setOption]);
  return <div className="header-zindex">disclosure page</div>;
};
export default Disclosure;
