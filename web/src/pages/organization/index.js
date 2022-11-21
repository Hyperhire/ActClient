import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Organization = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', subtitle: '', description: '', back: true, menu: true });
  }, [setOption]);
  return (
    <div>
      <Outlet setOption={setOption} />
    </div>
  );
};
export default Organization;
