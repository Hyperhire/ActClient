import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { DONATION_MENU, DONATION_MENU_TYPE } from 'constants/constant';

const DonationBase = () => {
  const { type } = useParams();
  console.log('DonationBase', type);
  return (
    <div className="row max-width max-height">
      <VerticalTabs options={DONATION_MENU} defaultValue={DONATION_MENU_TYPE.ORG} />
      <div className="max-width max-height">
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default DonationBase;
