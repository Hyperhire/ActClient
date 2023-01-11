import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { PAYMENT_MENU, PAYMENT_MENU_TYPE } from 'constants/constant';

const PaymentBase = () => {
  const { type } = useParams();
  console.log('OrganizationBase', type);
  return (
    <div className="row max-width max-height">
      <VerticalTabs options={PAYMENT_MENU} defaultValue={PAYMENT_MENU_TYPE.PAYMENT} />
      <div className="max-width max-height">
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default PaymentBase;
