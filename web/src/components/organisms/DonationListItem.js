import React from 'react';
import dayjs from 'dayjs';
import ActButton from 'components/atoms/ActButton';
import { DONATION_PAYMENT_TYPE, DONATION_TYPE } from 'constants/constant';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';
import 'dayjs/locale/ko';

const DonationListItem = ({ item, handleCancelRegularPayment, handleClickNFT }) => {
  return (
    <div className="donation-list-item-wrapper">
      <div className="item-list-wrapper">
        <div className="item-wrapper">
          <div className="title">단체명</div>
          <div className="content">{item.org.name}</div>
        </div>
        {item.targetType === DONATION_TYPE.CAMPAIGN && (
          <div className="item-wrapper">
            <div className="title">캠페인명</div>
            <div className="content">{item.campaign.title}</div>
          </div>
        )}
        <div className="item-wrapper">
          <div className="title">시작일</div>
          <div className="content">{dayjs(item.startedAt).locale('ko').format('YYYY.MM.DD a h:mm')}</div>
        </div>
        {item.targetType === DONATION_TYPE.ORGANIZATION && (
          <div className="item-wrapper">
            <div className="title">종료일</div>
            <div className="content">{item.endedAt ?? '-'}</div>
          </div>
        )}

        <div className="item-wrapper">
          <div className="title">결제금액</div>
          <div className="content">{item.amount.toLocaleString()}</div>
        </div>
        <div className="item-wrapper">
          <div className="title">후원방식</div>
          <div className="content">{item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION ? '정기후원' : '일시후원'}</div>
        </div>
        {item.targetType === DONATION_TYPE.ORGANIZATION && (
          <div className="item-wrapper">
            <div className="title">정기결제일</div>
            <div className="content">{item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION ? `매월 ${item.subscriptionOn}일` : '-'}</div>
          </div>
        )}
      </div>
      <div className="button-wrapper">
        {item.targetType === DONATION_TYPE.ORGANIZATION && item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && (
          <div className="donation-list-item-button">
            <ActButton
              className="primary-button-large-outline"
              label={item.active ? '후원 해지하기' : '후원 해지 완료'}
              handleOnClick={() => handleCancelRegularPayment(item)}
              disabled={!item.active}
            />
          </div>
        )}

        <div className="donation-list-item-button">
          <ActButton
            className="primary-button-large"
            label={
              <div className="row align-center justify-center">
                <Act width="3.2rem" height="1.1rem" />
                <div>NFT 확인</div>
              </div>
            }
            handleOnClick={() => handleClickNFT(item)}
          />
        </div>
      </div>
    </div>
  );
};
export default DonationListItem;
