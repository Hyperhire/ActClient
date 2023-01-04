import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { DONATION_TYPE } from '../../constants/constant';

const SettlementItem = ({ item }) => {
  return (
    <div className="settlement-list-item-wrapper">
      <div className="item-wrapper">
        <div className="title">결제일</div>
        <div className="content">{dayjs(item.updatedAt).locale('ko').format('YYYY.MM.DD a h:mm')}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">단체명</div>
        <div className="content">{item.org.name}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">후원형태</div>
        <div className="content">{item.targetType === DONATION_TYPE.ORGANIZATION ? '단체후원' : '캠페인후원'}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">결제금액</div>
        <div className="content">{item.amount}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">후원방식</div>
        <div className="content">{item.isRecurring ? '정기후원' : '일시후원'}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">결제상태</div>
        <div className="content">{item.paidStatus === 'notyet' ? '정산요청대기' : '정산요청완료'}</div>
      </div>
    </div>
  );
};
export default SettlementItem;
