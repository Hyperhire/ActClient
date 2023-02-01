import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { MEMBER_TYPE, PAYMENT_MENU, PAYMENT_MENU_TYPE } from 'constants/constant';

const PaymentBase = () => {
  const { type, id } = useParams();
  return (
    <div className="row max-width max-height">
      <VerticalTabs options={PAYMENT_MENU} defaultValue={PAYMENT_MENU_TYPE.PAYMENT} />
      <div className="col max-width max-height gap-24 padding-16">
        <div className="col">
          <div>{type === PAYMENT_MENU_TYPE.PAYMENT ? `결제정산 /결제관리${id ? '(상세페이지)' : '(리스트)'}` : `결제정산 /정산관리${id ? '(상세페이지)' : '(리스트)'}`}</div>
          <div className="divider-thick-primary-4" />
        </div>
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default PaymentBase;
