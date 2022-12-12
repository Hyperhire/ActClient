import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ActInput from 'components/atoms/ActInput';

const ActDatePicker = ({ register, id, errors, control, label, value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={newValue => {
          console.log('DatePicker onchange');
          if (!newValue) return;
          if (newValue.isValid()) {
            setValue(id, dayjs(newValue, 'YY/MM/DD'), { shouldValidate: true, shouldDirty: false });
          }
        }}
        maxDate={new Date()}
        inputFormat="YY/MM/DD"
        renderInput={params => {
          return <ActInput {...register(id)} id={id} label={label} required placeholder="YYMMDD" errors={errors} control={control} params={params} handleDataPicker={params.onClick} />;
        }}
      />
    </LocalizationProvider>
  );
};

export default ActDatePicker;
