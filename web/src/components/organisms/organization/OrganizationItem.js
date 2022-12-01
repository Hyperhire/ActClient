import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';

const OrganizationItem = props => {
  const navigate = useNavigate();
  const { item, clickHandler } = props;
  const { id, label, donationStatus, description, Logo } = item;
  return (
    <div className="organization-item-wrapper link" onClick={() => clickHandler(id)}>
      <div className="organization-item">
        <div className="organization-item-label-wrapper">
          <div className="organization-item-label">{label}</div>
          {donationStatus && <Give />}
        </div>
        <div className="organization-item-description">{description}</div>
      </div>
      <Logo />
    </div>
  );
};
export default OrganizationItem;
