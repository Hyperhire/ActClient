import React from 'react';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';
import kakkaPaymentIcon from 'styles/assets/images/icons/payment_icon_yellow_small.png';
const APP_ADMIN_KEY = '1859ddf11d71d2d86ae123d4565e24cc';
const KakaoPayButton = ({
  paymentData = {
    cid: 'TC0ONETIME',
    partner_order_id: '1',
    partner_user_id: 'lucas',
    item_name: '일시 후원',
    quantity: 1,
    total_amount: 100000,
    tax_free_amount: 100000,
    approval_url: 'https://www.act-donation.co.kr',
    cancel_url: 'https://www.act-donation.co.kr',
    fail_url: 'https://www.act-donation.co.kr',
    payment_method_type: 'CARD',
  },
  callBackResult,
}) => {
  const onClickHandler = () => {
    const result = request('kakao', {
      url: api.payment.kakao,
      method: 'post',
      headers: { Authorization: `KakaoAK ${APP_ADMIN_KEY}`, 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: paymentData,
    });
    callBackResult(result);
  };
  return (
    <div className="link" onClick={onClickHandler}>
      <img src={kakkaPaymentIcon} alt="" />
    </div>
  );
};
export default KakaoPayButton;
