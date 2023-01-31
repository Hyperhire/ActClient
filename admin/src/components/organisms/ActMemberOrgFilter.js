import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';

export default function ActMemberOrgFilter({ handleFilter }) {
  const memberStateOptions = [
    { label: '전체', value: 'all' },
    { label: '대기', value: 'pending' },
    { label: '승인', value: 'approved' },
    { label: '불가', value: 'rejected' },
    { label: '탈퇴', value: 'resigned' },
  ];

  const current = new Date();
  const [startDate, setStartDate] = useState(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(new Date());
  const [memberSearch, setMemberSearch] = useState('');
  const [memberState, setMemberState] = useState(memberStateOptions[0].value);

  const baseFilterData = {
    date: { label: '가입일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: memberSearch, setValue: setMemberSearch } },
  };

  useEffect(() => {
    handleFilter({ startDate, endDate, memberSearch, memberState });
  }, [startDate, endDate, memberSearch, memberState, handleFilter]);

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setMemberSearch('');
    setMemberState(memberStateOptions[0].value);
  };
  const onHandleConfirm = () => {
    console.log('확인');
  };
  return (
    <div className="max-height max-width">
      <ActFilter data={baseFilterData} handleInit={onHandleInit} handleConfirm={onHandleConfirm}>
        <div className="row align-center ">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>회원상태</div>
            <ActRadioGroup options={memberStateOptions} state={memberState} setState={setMemberState} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
