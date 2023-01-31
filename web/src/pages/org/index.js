import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const OrgBase = ({ setOption }) => {
  return (
    <div className="max-width max-height">
      <Outlet setOption={setOption} />
    </div>
  );
};
export default OrgBase;
