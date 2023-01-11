import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

const ActDatePicker = ({ value, setValue, maxDate, minDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        inputFormat="YYYY-MM-DD"
        mask="____-__-__"
        maxDate={maxDate && maxDate}
        minDate={minDate && minDate}
        renderInput={params => (
          <TextField
            hiddenLabel
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'white',
              },
            }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default ActDatePicker;
