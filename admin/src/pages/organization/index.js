import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { MEMBER_TYPE, ORGANIZATION_MENU, ORGANIZATION_MENU_TYPE } from '../../constants/constant';

const OrganizationBase = () => {
  const { type, id = '' } = useParams();

  return (
    <div className="row max-width max-height">
      <VerticalTabs options={ORGANIZATION_MENU} defaultValue={ORGANIZATION_MENU[0].value} />
      <div className="col max-width max-height gap-24 padding-16">
        <div className="col">
          <div>
            {type === ORGANIZATION_MENU_TYPE.NOTICE
              ? `단체관리/공시관리${id ? '(상세정보)' : '(리스트)'}`
              : type === ORGANIZATION_MENU_TYPE.NEWS
              ? `단체관리/소식관리${id ? '(상세정보)' : '(리스트)'} `
              : `단체관리/캠페인관리${id ? '(상세정보)' : '(리스트)'} `}
          </div>
          <div className="divider-thick-primary-4" />
        </div>
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default OrganizationBase;
