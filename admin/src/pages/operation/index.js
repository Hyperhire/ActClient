import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { MEMBER_TYPE, OPERATION_MENU, OPERATION_MENU_TYPE, ORGANIZATION_MENU_TYPE } from 'constants/constant';

const OperationBase = () => {
  const { type, id } = useParams();

  return (
    <div className="row max-width max-height">
      <VerticalTabs options={OPERATION_MENU} defaultValue={OPERATION_MENU_TYPE.FAQ} />
      <div className="col max-width max-height gap-24 padding-16">
        <div className="col">
          <div>{type === OPERATION_MENU_TYPE.FAQ ? `운영관리/FAQ${id ? '(상세페이지)' : '(리스트)'}` : '운영관리/베너관리'}</div>
          <div className="divider-thick-primary-4" />
        </div>
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default OperationBase;
