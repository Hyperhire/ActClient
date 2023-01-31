import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import ActCheckBox from '../atoms/ActCheckBox';
import 'dayjs/locale/ko';

const PaymentHistoryItem = ({ id, item, index, control, register, errors, watch, changeHandler }) => {
  return (
    <div className="payment-history-item-wrapper">
      {/*<div className="payment-history-item-checkbox-wrapper">*/}
      {/*  <ActCheckBox*/}
      {/*    {...register(`${id}.${index}`)}*/}
      {/*    id={`${id}.${index}`}*/}
      {/*    checked={watch(`${id}.${index}`).checked}*/}
      {/*    label=""*/}
      {/*    errors={errors}*/}
      {/*    control={control}*/}
      {/*    item={item}*/}
      {/*    handleChange={changeHandler}*/}
      {/*    labelStyle={{ padding: 0 }}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="payment-history-item-in-wrapper">
        <div className="payment-history-item-label-wrapper">
          <div className="payment-history-item-label">결제방법</div>
          <div className="payment-history-item-label">결제일</div>
          <div className="payment-history-item-label">결제금액</div>
        </div>
        <div className="payment-history-item-content-wrapper">
          <div className="payment-history-item-content">{item.pg}</div>
          <div className="payment-history-item-content">{dayjs(item.createdAt).locale('ko').format('YYYY.MM.DD a h:mm')}</div>
          <div className="row payment-history-item-content">
            <div>{item.amount.toLocaleString()}원</div>
            <div className="payment-history-item-type-regular-label">정기결제</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentHistoryItem;
