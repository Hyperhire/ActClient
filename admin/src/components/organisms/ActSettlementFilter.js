import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';

export default function ActSettlementFilter({ filter, handleFilter }) {
  const settlementStatusOptions = [
    { label: '전체', value: 'all' },
    { label: '지급대기', value: 'pending' },
    { label: '지급완료', value: 'completed' },
  ];

  const current = new Date();
  const [startDate, setStartDate] = useState(filter?.startDate || new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(filter?.endDate || new Date());
  const [search, setSearch] = useState(filter?.search || '');
  const [settlementStatus, setSettlementStatus] = useState(filter?.settlementStatus || settlementStatusOptions[0].value);

  const baseFilterData = {
    date: { label: '정산요청일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: search, setValue: setSearch } },
  };

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setSearch('');
    setSettlementStatus(settlementStatusOptions[0].value);
  };
  const onHandleConfirm = () => {
    handleFilter({ startDate, endDate, search, settlementStatus });
  };
  return (
    <div className="max-height max-width">
      <ActFilter data={baseFilterData} handleInit={onHandleInit} handleConfirm={onHandleConfirm}>
        <div className="row align-center ">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>정산상태</div>
            <ActRadioGroup options={settlementStatusOptions} state={settlementStatus} setState={setSettlementStatus} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
