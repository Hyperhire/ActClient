import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';
import { DONATION_PAYMENT_TYPE, DONATION_STATUS_VALUE, DONATION_TYPE } from '../../constants/constant';

export default function ActDonationOrgFilter({ handleFilter }) {
  const donationTypeOptions = [
    { label: '전체', value: 'all' },
    { label: '정기후원', value: DONATION_PAYMENT_TYPE.SUBSCRIPTION },
    { label: '일시후원', value: DONATION_PAYMENT_TYPE.SINGLE },
  ];
  const donationStatusOptions = [
    { label: '전체', value: 'all' },
    { label: '진행중', value: DONATION_STATUS_VALUE.ACTIVE },
    { label: '종료', value: DONATION_STATUS_VALUE.INACTIVE },
  ];
  const current = new Date();
  const [startDate, setStartDate] = useState(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [donationType, setDonationType] = useState(donationTypeOptions[0].value);
  const [donationStatus, setDonationStatus] = useState(donationStatusOptions[0].value);

  const baseFilterData = {
    date: { label: '정산요청일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: search, setValue: setSearch } },
  };

  useEffect(() => {
    handleFilter({ startDate, endDate, search, donationType, donationStatus });
  }, [startDate, endDate, search, donationType, donationStatus, handleFilter]);

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setSearch('');
    setDonationType(donationTypeOptions[0].value);
    setDonationStatus(donationStatusOptions[0].value);
  };
  const onHandleConfirm = () => {
    console.log('확인');
  };
  return (
    <div className="max-height max-width">
      <ActFilter data={baseFilterData} handleInit={onHandleInit} handleConfirm={onHandleConfirm}>
        <div className="row align-center ">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>후원형태</div>
            <ActRadioGroup options={donationTypeOptions} state={donationType} setState={setDonationType} />
          </div>
          <div className="flex-1 align-center justify-start row gap-16">
            <div>정기후원 상태</div>
            <ActRadioGroup options={donationStatusOptions} state={donationStatus} setState={setDonationStatus} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
