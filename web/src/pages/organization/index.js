import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Organization = ({ setOption }) => {
  return (
    <div>
      <Outlet setOption={setOption} />
    </div>
  );
};
export default Organization;
