import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { MEMBER_MENU } from '../../constants/constant';

const MemberBase = () => {
  const { type } = useParams();

  return (
    <div className="row max-width max-height">
      <VerticalTabs options={MEMBER_MENU} defaultValue={MEMBER_MENU[0].value} />
      <div className="max-width max-height">
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default MemberBase;
