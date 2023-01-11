import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { ORGANIZATION_MENU } from '../../constants/constant';

const OrganizationBase = () => {
  const { type } = useParams();
  console.log('OrganizationBase', type);
  return (
    <div className="row max-width max-height">
      <VerticalTabs options={ORGANIZATION_MENU} defaultValue={ORGANIZATION_MENU[0].value} />
      <div className="max-width max-height">
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default OrganizationBase;
