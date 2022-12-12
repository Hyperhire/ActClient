import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const NewsBase = ({ setOption }) => {
  return (
    <div className="max-width max-height">
      <Outlet setOption={setOption} />
    </div>
  );
};
export default NewsBase;
