import React from 'react';

const OrganizationCover = props => {
  const { item } = props;
  const { Icon, title, subTitle } = item;
  return (
    <div className="organization-cover-wrapper background-test1">
      <div className="organization-cover-image-wrapper">
        <div className="organization-cover-label-wrapper">
          <div className="organization-cover-common-label-wrapper">
            <div className="organization-cover-common-label">DONOR ORGANIZATION</div>
            <div className="organization-cover-common-label-divider" />
          </div>
          <div className="organization-cover-info-wrapper ">
            <Icon />
            <div className="organization-cover-title">{title}</div>
            <div className="organization-cover-subtitle">{subTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationCover;
