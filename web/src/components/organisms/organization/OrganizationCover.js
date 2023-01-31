import React from 'react';

const OrganizationCover = props => {
  const { item } = props;
  const { logoUrl, imageUrls } = item;
  return (
    <div className="organization-cover-wrapper">
      <div className="organization-cover-image-wrapper" style={{ background: `url(${imageUrls[0]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="organization-cover-label-wrapper">
          <div className="organization-cover-common-label-wrapper">
            <div className="organization-cover-common-label">DONOR ORGANIZATION</div>
            <div className="organization-cover-common-label-divider" />
          </div>
          <div className="organization-cover-info-wrapper ">
            <div className="organization-cover-icon">
              <img src={logoUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizationCover;
