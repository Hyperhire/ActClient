import React from 'react';
import dayjs from 'dayjs';
import { ReactComponent as TwoPerson } from 'styles/assets/icons/2person.svg';

const CampaignItem = props => {
  const { item, clickHandler } = props;
  const { images, org, title, rate = 0, amount = 0, endedAt } = item;
  const dDay = () => {
    let today = dayjs();
    let expired_at = dayjs(endedAt);
    let result = expired_at.diff(today, 'day', true);
    return Math.floor(result);
  };

  return (
    <div className="on-going-campaign-item-wrapper link" onClick={() => clickHandler(item)}>
      <div className="item-image">
        <img src={images[0]} alt="" />
      </div>
      <div className="item-info-wrapper">
        <div className="title-wrapper">
          <div className="organization-wrapper">
            <div className="organization-icon">
              <TwoPerson />
            </div>
            <div className="organization-label">{org.name}</div>
          </div>
          <div className="title">{title}</div>
        </div>
        <div className="etc-wrapper">
          <div className="rate-amount-wrapper">
            <div className="rate">{rate}%</div>
            <div className="amount">{amount.toLocaleString()}원</div>
          </div>
          <div className="remaining-period">{dDay()}일 남음</div>
        </div>
      </div>
    </div>
  );
};
export default CampaignItem;
