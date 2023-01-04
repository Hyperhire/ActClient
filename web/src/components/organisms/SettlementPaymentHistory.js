import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';

const SettlementPaymentHistory = ({ item }) => {
  return (
    <div className="settlement-list-item-wrapper">
      <div className="item-wrapper">
        <div className="title">정산요청일</div>
        <div className="content">{dayjs(item.updatedAt).locale('ko').format('YYYY.MM.DD a h:mm')}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">정산요청금액</div>
        <div className="content">{`${item.amount.toLocaleString()}원`}</div>
      </div>
      <div className="item-wrapper">
        <div className="title">정산상태</div>
        <div className="content">{item.status === 'PENDING' ? '지급대기' : '지급완료'}</div>
      </div>
    </div>
  );
};
export default SettlementPaymentHistory;
