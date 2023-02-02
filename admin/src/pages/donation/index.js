import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { DONATION_MENU, DONATION_MENU_TYPE, MEMBER_TYPE } from 'constants/constant';

const DonationBase = () => {
  const { type, id } = useParams();

  return (
    <div className="row max-width max-height">
      <VerticalTabs options={DONATION_MENU} defaultValue={DONATION_MENU_TYPE.ORG} />
      <div className="col max-width max-height gap-24 padding-16">
        <div className="col">
          <div>{type === DONATION_MENU_TYPE.ORG ? `후원관리/단체후원${id ? '(상세페이지)' : '(리스트)'}` : `후원관리/캠페인후원${id ? '(상세페이지)' : '(리스트)'}`}</div>
          <div className="divider-thick-primary-4" />
        </div>
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default DonationBase;
