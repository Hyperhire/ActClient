import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ActButton from './ActButton';
import ActInput from 'components/atoms/ActInput';

const ActDatePicker = ({ register, id, errors, control, label }) => {
  // const [value, setValue] = useState(dayjs('1990-01-01'));
  const [value, setValue] = useState('');
  const handleChange = newValue => {
    console.log('newValue', newValue);
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(value, 'YYMMDD')}
        onChange={newValue => {
          if (!newValue) return;
          if (newValue.isValid()) {
            setValue(newValue);
          }
        }}
        renderInput={params => {
          return (
            <ActInput
              {...register('userBirthday')}
              id={id}
              label="생년월일"
              required
              placeholder="YYMMDD"
              errors={errors}
              control={control}
              params={params}
              handleDataPicker={params.onClick}
              handleChange={handleChange}
            />
          );
        }}
        inputFormat="YYMMDD"
      />
    </LocalizationProvider>
  );
};

export default ActDatePicker;
