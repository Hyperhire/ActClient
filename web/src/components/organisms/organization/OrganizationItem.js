import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';

const OrganizationItem = props => {
  const { item, clickHandler } = props;
  const { _id, name, donationStatus, shortDescription, image } = item;
  return (
    <div className="organization-item-wrapper link" onClick={() => clickHandler(_id)}>
      <div className="organization-item">
        <div className="organization-item-label-wrapper">
          <div className="organization-item-label">{name}</div>
          {donationStatus && <Give />}
        </div>
        <div className="organization-item-description">{shortDescription}</div>
      </div>
      <div className="organization-item-logo">
        <img src={image} alt="" />
      </div>
    </div>
  );
};
export default OrganizationItem;
