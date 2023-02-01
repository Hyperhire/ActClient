import React, { useEffect, useRef, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';

export default function ActOrganizationCampaignFilter({ type, filter, handleFilter }) {
  const approvalStatusOptions = [
    { label: '전체', value: 'all' },
    { label: '대기', value: 'pending' },
    { label: '승인', value: 'approved' },
    { label: '불가', value: 'rejected' },
  ];
  console.log('ActOrganizationCampaignFilter', filter);
  const current = new Date();
  const [startDate, setStartDate] = useState(filter?.startDate || new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(filter?.endDate || new Date());
  const [search, setSearch] = useState(filter?.search || '');
  const [approvalStatus, setApprovalStatus] = useState(filter?.approvalStatus || approvalStatusOptions[0].value);

  const baseFilterData = {
    date: { label: '등록일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: search, setValue: setSearch } },
  };

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setSearch('');
    setApprovalStatus(approvalStatusOptions[0].value);
  };
  const onHandleConfirm = () => {
    handleFilter({ startDate, endDate, search, approvalStatus });
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
