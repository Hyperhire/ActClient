import React from 'react';

const OrganizationCover = props => {
  const { item } = props;
  const { icon, name, shortDescription } = item;
  return (
    <div className="organization-cover-wrapper">
      <div className="organization-cover-image-wrapper">
        <div className="organization-cover-label-wrapper">
          <div className="organization-cover-common-label-wrapper">
            <div className="organization-cover-common-label">DONOR ORGANIZATION</div>
            <div className="organization-cover-common-label-divider" />
          </div>
          <div className="organization-cover-info-wrapper ">
            <div className="organization-cover-icon">
              <img src={icon} alt="" />
            </div>
            <div className="organization-cover-title">{name}</div>
            <div className="organization-cover-subtitle">{shortDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationCover;
