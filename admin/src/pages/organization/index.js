import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from 'components/atoms/ActVerticalTab';
import { ORGANIZATION_MENU } from '../../constants/constant';

const OrganizationBase = () => {
  const { postType, postId = '' } = useParams();
  console.log('OrganizationBase', postType, postId);
  return (
    <div className="row max-width max-height">
      <VerticalTabs options={ORGANIZATION_MENU} defaultValue={ORGANIZATION_MENU[0].value} />
      <div className="max-width max-height">
        <Outlet context={postType} />
      </div>
    </div>
  );
};
export default OrganizationBase;
