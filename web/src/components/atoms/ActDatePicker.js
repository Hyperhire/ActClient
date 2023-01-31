import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ActInput from 'components/atoms/ActInput';

const ActDatePicker = ({ register, id, errors, control, label, value, setValue, format = 'YY/MM/DD', maxDate, minDate, placeholder = 'YYMMDD', inputAdornment }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={newValue => {
          if (!newValue) return;
          if (newValue.isValid()) {
            setValue(id, dayjs(newValue, format), { shouldValidate: true, shouldDirty: false });
          }
        }}
        maxDate={maxDate && maxDate}
        minDate={minDate && minDate}
        inputFormat={format}
        renderInput={params => {
          return (
            <ActInput
              {...register(id)}
              id={id}
              label={label}
              required
              placeholder={placeholder}
              errors={errors}
              control={control}
              params={{ ...params, InputProps: { ...params.InputProps, endAdornment: inputAdornment } }}
              handleDataPicker={params.onClick}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default ActDatePicker;
