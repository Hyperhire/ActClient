import React from 'react';
import ActButton from 'components/atoms/ActButton';
import { DONATION_TYPE } from 'constants/constant';

const DonationListItem = ({ type, item, handleCancelRecurringPayment, handleClickNFT }) => {
  return (
    <div className="donation-list-item-wrapper">
      <div className="item-list-wrapper">
        <div className="item-wrapper">
          <div className="title">단체명</div>
          <div className="content">{item.organization}</div>
        </div>
        {type === DONATION_TYPE.CAMPAIGN && (
          <div className="item-wrapper">
            <div className="title">캠페인명</div>
            <div className="content">{item.campaignTitle}</div>
          </div>
        )}
        <div className="item-wrapper">
          <div className="title">시작일</div>
          <div className="content">{item.startDate}</div>
        </div>
        {type === DONATION_TYPE.ORGANIZATION && (
          <div className="item-wrapper">
            <div className="title">종료일</div>
            <div className="content">{item.endDate}</div>
          </div>
        )}

        <div className="item-wrapper">
          <div className="title">결제금액</div>
          <div className="content">{item.amount}</div>
        </div>
        <div className="item-wrapper">
          <div className="title">후원방식</div>
          <div className="content">{item.donationType}</div>
        </div>
        {type === DONATION_TYPE.ORGANIZATION && (
          <div className="item-wrapper">
            <div className="title">정기결제일</div>
            <div className="content">{item.recurringPaymentDate}</div>
          </div>
        )}
      </div>
      <div className="button-wrapper">
        {type === DONATION_TYPE.ORGANIZATION && (
          <ActButton
            className="donation-list-item-button"
            label={item.donationStatus === 'cancel' ? '후원 해지 완료' : '후원 해지하기'}
            handleOnClick={() => handleCancelRecurringPayment(item.id)}
            disabled={item.donationStatus === 'cancel'}
          />
        )}
        <ActButton className="donation-list-item-button" label="Act nft 확인" handleOnClick={() => handleClickNFT(item.id)} />
      </div>
    </div>
  );
};
export default DonationListItem;
