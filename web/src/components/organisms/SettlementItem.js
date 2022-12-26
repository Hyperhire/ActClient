import React, { useContext, useEffect } from 'react';
const SettlementItem = ({ item }) => {
  return (
    <div className="col">
      <div className="row">
        <div>결제일</div>
        <div>2022-10-25</div>
      </div>
      <div className="row">
        <div>단체명</div>
        <div>2022-10-25</div>
      </div>
      <div className="row">
        <div>후원형태</div>
        <div>2022-10-25</div>
      </div>
      <div className="row">
        <div>결제금액</div>
        <div>{item.amount}</div>
      </div>
      <div className="row">
        <div>후원방식</div>
        <div>2022-10-25</div>
      </div>
      <div className="row">
        <div>결제상태</div>
        <div>정산요청대기</div>
      </div>
    </div>
  );
};
export default SettlementItem;
