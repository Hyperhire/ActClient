import React from 'react';
import TextField from '@mui/material/TextField';
import ActDatePicker from './ActDatePicker';
import ActButton from './ActButton';

export default function ActFilter({ data, children, handleConfirm, handleInit }) {
  const current = new Date();
  return (
    <div className="col gap-16 max-height max-width">
      <div className="col gap-16 background-box max-width padding-8">
        <div className="row align-center justify-center">
          <div className="flex-1 align-center justify-start row gap-16">
            <div className="bold">{data.date.label}</div>
            <ActDatePicker value={data.date.state.startDateState.value} setValue={data.date.state.startDateState.setValue} maxDate={new Date()} />
            <ActDatePicker value={data.date.state.endDateState.value} setValue={data.date.state.endDateState.setValue} maxDate={new Date()} minDate={data.date.state.startDateState.value} />
            <div
              className="link"
              onClick={() => {
                data.date.state.startDateState.setValue(new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7));
                data.date.state.endDateState.setValue(current);
              }}
            >
              일주일
            </div>
            <div
              className="link"
              onClick={() => {
                data.date.state.startDateState.setValue(new Date(current.getFullYear(), current.getMonth() - 1, current.getDate()));
                data.date.state.endDateState.setValue(current);
              }}
            >
              한달
            </div>
            <div
              className="link"
              onClick={() => {
                data.date.state.startDateState.setValue(new Date(current.getFullYear(), current.getMonth() - 3, current.getDate()));
                data.date.state.endDateState.setValue(current);
              }}
            >
              3개월
            </div>
          </div>
          <div className="flex-1 align-center justify-start row gap-16 ">
            <div className="bold">{data.search.label}</div>
            <TextField
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'white',
                  width: '30rem',
                },
              }}
              hiddenLabel
              id="outlined-basic"
              variant="outlined"
              value={data.search.state.value}
              onChange={e => data.search.state.setValue(e.target.value)}
            />
          </div>
        </div>
        {children}
      </div>
      <div className="row align-center justify-center gap-16 flex-1">
        <ActButton label="기본설정" handleOnClick={() => handleInit()} />
        <ActButton label="확인" handleOnClick={() => handleConfirm()} />
      </div>
    </div>
  );
}
