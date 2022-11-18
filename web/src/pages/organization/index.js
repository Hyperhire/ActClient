import React, { useEffect, useState } from 'react';

const Organization = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '기부 단체', back: true, hideMenu: false });
  }, [setOption]);
  return <div className="header-zindex">Organization page</div>;
};
export default Organization;
