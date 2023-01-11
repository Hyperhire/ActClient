import React, { useEffect, useState } from 'react';
import ActFilter from 'components/atoms/ActFilter';
import ActRadioGroup from 'components/atoms/ActRadioGroup';

export default function ActOperationFilter({ handleFilter }) {
  const displayStateOptions = [
    { label: '노출', value: 'show' },
    { label: '비노출', value: 'hide' },
  ];

  const current = new Date();
  const [startDate, setStartDate] = useState(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [displayState, setDisplayState] = useState(displayStateOptions[0].value);

  const baseFilterData = {
    date: { label: '등록일', state: { startDateState: { value: startDate, setValue: setStartDate }, endDateState: { value: endDate, setValue: setEndDate } } },
    search: { label: '검색', state: { value: search, setValue: setSearch } },
  };

  useEffect(() => {
    handleFilter({ startDate, endDate, search, displayState });
  }, [startDate, endDate, search, displayState, handleFilter]);

  const onHandleInit = () => {
    setStartDate(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
    setEndDate(new Date());
    setSearch('');
    setDisplayState(displayStateOptions[0].value);
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
            <ActRadioGroup options={displayStateOptions} state={displayState} setState={setDisplayState} />
          </div>
        </div>
      </ActFilter>
    </div>
  );
}
