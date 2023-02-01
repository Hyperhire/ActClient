import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';

export default function ActMemberIndFilter({ filter, handleFilter }) {
  const memberStateOptions = [
    { label: '전체', value: 'all' },
    { label: '정상', value: 'normal' },
    { label: '탈퇴', value: 'resign' },
  ];
  const memberTypeOptions = [
    { label: '전체', value: 'all' },
    { label: '이메일', value: 'email' },
    { label: '카카오', value: 'kakao' },
  ];

  const current = new Date();
  const [startDate, setStartDate] = useState(filter?.startDate || new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(filter?.endDate || new Date());
  const [memberSearch, setMemberSearch] = useState(filter?.memberSearch || '');
  const [memberState, setMemberState] = useState(filter?.memberState || memberStateOptions[0].value);
  const [memberType, setMemberType] = useState(filter?.memberType || memberTypeOptions[0].value);

  const baseFilterData = {
    date: { label: '가입일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: memberSearch, setValue: setMemberSearch } },
  };

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setMemberSearch('');
    setMemberState(memberStateOptions[0].value);
    setMemberType(memberTypeOptions[0].value);
  };
  const onHandleConfirm = () => {
    handleFilter({ startDate, endDate, memberSearch, memberState, memberType });
  };
  return (
    <div className="max-height max-width">
      <ActFilter data={baseFilterData} handleInit={onHandleInit} handleConfirm={onHandleConfirm}>
        <div className="row align-center ">
          <div className="flex-1 align-center justify-start row gap-16">
            <div>회원상태</div>
            <ActRadioGroup options={memberStateOptions} state={memberState} setState={setMemberState} />
          </div>
          <div className="flex-1 align-center justify-start row gap-16">
            <div>계정유형</div>
            <ActRadioGroup options={memberTypeOptions} state={memberType} setState={setMemberType} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
