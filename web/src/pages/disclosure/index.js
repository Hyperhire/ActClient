import React, { useEffect, useState } from 'react';

const Disclosure = ({ setOption }) => {
  useEffect(() => {
    setOption({ subtitle: '단체 공시', back: true, menu: true });
  }, [setOption]);
  return <div>disclosure page</div>;
};
export default Disclosure;
