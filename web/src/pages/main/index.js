import React, { useEffect, useState } from 'react';

const Main = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', back: false, menu: true });
  }, [setOption]);
  return <div>main page</div>;
};
export default Main;
