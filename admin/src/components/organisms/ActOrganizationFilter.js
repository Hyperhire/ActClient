import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';

export default function ActOrganizationFilter({ type, handleFilter }) {
  const approvalStatusOptions = [
    { label: '전체', value: 'all' },
    { label: '대기', value: 'pending' },
    { label: '승인', value: 'approved' },
    { label: '불가', value: 'rejected' },
  ];

  const current = new Date();
  const [startDate, setStartDate] = useState(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(approvalStatusOptions[0].value);

  const baseFilterData = {
    date: { label: '등록일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: search, setValue: setSearch } },
  };

  useEffect(() => {
    handleFilter({ startDate, endDate, search, approvalStatus });
  }, [startDate, endDate, search, approvalStatus, handleFilter]);

  useEffect(() => {
    onHandleInit();
  }, [type]);

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setSearch('');
    setApprovalStatus(approvalStatusOptions[0].value);
  };
  const onHandleConfirm = () => {
    console.log('확인');
  };
  return (
    <div className="max-height max-width">
      <ActFilter data={baseFilterData} handleInit={onHandleInit} handleConfirm={onHandleConfirm}>
        <div className="row align-center ">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>승인상태</div>
            <ActRadioGroup options={approvalStatusOptions} state={approvalStatus} setState={setApprovalStatus} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
