import React from 'react';
import dayjs from 'dayjs';
import ActButton from 'components/atoms/ActButton';
import { DONATION_TYPE } from 'constants/constant';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';
import 'dayjs/locale/ko';

const DonationListItem = ({ type, item, handleCancelRegularPayment, handleClickNFT }) => {
  return (
    <div className="donation-list-item-wrapper">
      <div className="item-list-wrapper">
        <div className="item-wrapper">
          <div className="title">단체명</div>
          <div className="content">{item.org.name}</div>
        </div>
        {type === DONATION_TYPE.CAMPAIGN && (
          <div className="item-wrapper">
            <div className="title">캠페인명</div>
            <div className="content">{item.campaignTitle}</div>
          </div>
        )}
        <div className="item-wrapper">
          <div className="title">시작일</div>
          <div className="content">{dayjs(item.startedAt).locale('ko').format('YYYY.MM.DD a h:mm')}</div>
        </div>
        {type === DONATION_TYPE.ORGANIZATION && (
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
          <div className="content">{item.isRecurring ? '정기후원' : '일시후원'}</div>
        </div>
        {type === DONATION_TYPE.ORGANIZATION && (
          <div className="item-wrapper">
            <div className="title">정기결제일</div>
            <div className="content">{item.regularPaymentDate}</div>
          </div>
        )}
      </div>
      <div className="button-wrapper">
        {type === DONATION_TYPE.ORGANIZATION && item.isRecurring && (
          <div className="donation-list-item-button">
            <ActButton
              className="primary-button-large-outline"
              label={item.isTerminated ? '후원 해지 완료' : '후원 해지하기'}
              handleOnClick={() => handleCancelRegularPayment(item._id)}
              disabled={item.isTerminated}
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
