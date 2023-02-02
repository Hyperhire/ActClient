import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';
import { DONATION_PAYMENT_TYPE, DONATION_TYPE } from '../../constants/constant';

export default function ActPaymentFilter({ filter, handleFilter }) {
  const paidStatusOptions = [
    { label: '전체', value: 'all' },
    { label: '대기', value: 'notyet' },
    { label: '취소', value: 'cancel' },
    { label: '실패', value: 'fail' },
    { label: '승인', value: 'approved' },
  ];
  const targetTypeOptions = [
    { label: '전체', value: 'all' },
    { label: '단체후원', value: DONATION_TYPE.ORGANIZATION },
    { label: '캠페인후원', value: DONATION_TYPE.CAMPAIGN },
  ];

  const paymentTypeOptions = [
    { label: '전체', value: 'all' },
    { label: '정기', value: DONATION_PAYMENT_TYPE.SUBSCRIPTION },
    { label: '일시', value: DONATION_PAYMENT_TYPE.SINGLE },
  ];
  const withdrawRequestStatusOptions = [
    { label: '전체', value: 'all' },
    { label: '정산요청대기', value: 'notyet' },
    { label: '정산요청완료', value: 'requested' },
  ];

  const current = new Date();
  const [startDate, setStartDate] = useState(filter?.startDate || new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(filter?.endDate || new Date());
  const [search, setSearch] = useState(filter?.search || '');
  const [targetType, setTargetType] = useState(filter?.targetType || targetTypeOptions[0].value);
  const [paidStatus, setPaidStatus] = useState(filter?.paidStatus || paidStatusOptions[0].value);
  const [paymentType, setPaymentType] = useState(filter?.paymentType || paymentTypeOptions[0].value);
  const [withdrawRequestStatus, setWithdrawRequestStatus] = useState(filter?.withdrawRequestStatus || withdrawRequestStatusOptions[0].value);

  const baseFilterData = {
    date: { label: '결제일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: search, setValue: setSearch } },
  };

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setSearch('');
    setTargetType(targetTypeOptions[0].value);
    setPaidStatus(paidStatusOptions[0].value);
    setPaymentType(paymentTypeOptions[0].value);
    setWithdrawRequestStatus(withdrawRequestStatusOptions[0].value);
  };
  const onHandleConfirm = () => {
    handleFilter({ startDate, endDate, search, targetType, paidStatus, paymentType, withdrawRequestStatus });
  };
  return (
    <div className="max-height max-width">
      <ActFilter data={baseFilterData} handleInit={onHandleInit} handleConfirm={onHandleConfirm}>
        <div className="row align-center ">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>결제유형</div>
            <ActRadioGroup options={paymentTypeOptions} state={paymentType} setState={setPaymentType} />
          </div>
          <div className="flex-1 align-center justify-start row gap-16">
            <div>후원형태</div>
            <ActRadioGroup options={targetTypeOptions} state={targetType} setState={setTargetType} />
          </div>
        </div>
        <div className="row align-center">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>결제상태</div>
            <ActRadioGroup options={withdrawRequestStatusOptions} state={withdrawRequestStatus} setState={setWithdrawRequestStatus} />
          </div>
          <div className="flex-1 align-center justify-start row gap-16">
            <div>결제상태</div>
            <ActRadioGroup options={paidStatusOptions} state={paidStatus} setState={setPaidStatus} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
