import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { MEMBER_MENU, MEMBER_TYPE } from '../../constants/constant';

const MemberBase = () => {
  const { type, id = undefined } = useParams();
  return (
    <div className="row max-width max-height">
      <VerticalTabs options={MEMBER_MENU} defaultValue={MEMBER_MENU[0].value} />
      <div className="col max-width max-height gap-24 padding-16">
        <div className="col">
          <div>{type === MEMBER_TYPE.INDIVIDUAL ? `일반회원${id ? '(상세정보)' : '(리스트)'}` : `단체회원${id ? '(상세정보)' : '(리스트)'}`}</div>
          <div className="divider-thick-primary-4" />
        </div>
        <Outlet context={type} />
      </div>
    </div>
  );
};
export default MemberBase;
