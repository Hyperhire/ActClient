import React from 'react';

const CampaignItem = props => {
  const { item } = props;
  const { image, OrganizationIcon, organizationLabel, title, rate, amount, remainingPeriod } = item;
  return (
    <div className="on-going-campaign-item-wrapper">
      <div className="item-image">
        <img src={image} alt="" />
      </div>
      <div className="item-info-wrapper">
        <div className="title-wrapper">
          <div className="organization-wrapper">
            <div className="organization-icon">
              <OrganizationIcon />
            </div>
            <div className="organization-label">{organizationLabel}</div>
          </div>
          <div className="title">{title}</div>
        </div>
        <div className="etc-wrapper">
          <div className="rate-amount-wrapper">
            <div className="rate">{rate}%</div>
            <div className="amount">{amount}원</div>
          </div>
          <div className="remaining-period">{remainingPeriod}일 남음</div>
        </div>
      </div>
    </div>
  );
};
export default CampaignItem;
