import React, { useEffect, useState } from 'react';

const Disclosure = ({ setOption }) => {
  useEffect(() => {
    setOption({ subtitle: '단체 공시', back: true, menu: true });
  }, [setOption]);
  return (
    <div>
      <div>disclosure page</div>
    </div>
  );
};
export default Disclosure;
