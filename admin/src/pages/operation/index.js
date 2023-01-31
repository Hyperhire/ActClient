import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { MEMBER_TYPE, OPERATION_MENU, OPERATION_MENU_TYPE } from 'constants/constant';

const OperationBase = () => {
  const { type } = useParams();

  return (
    <div className="row max-width max-height">
      <VerticalTabs options={OPERATION_MENU} defaultValue={OPERATION_MENU_TYPE.FAQ} />
      <div className="max-width max-height">
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default OperationBase;
