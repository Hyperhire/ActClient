import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import { ReactComponent as RedStar } from '../../styles/assets/icons/star/red.svg';

const ActDatePicker2 = ({ register, id, errors, required = false, control, label, hideErrorMessage = false }) => {
  const isError = !!(JSON.stringify(errors) !== '{}' && errors[id]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="act-input-wrapper">
        {label && (
          <div className="label-wrapper">
            <div className="label">{label}</div>
            {required ? <RedStar /> : null}
          </div>
        )}
        <div className="text-field-area-wrapper">
          <DatePicker
            // value={value}
            // onChange={newValue => {
            //   if (!newValue) return;
            //   if (newValue.isValid()) {
            //     onChange(newValue);
            //   }
            // }}
            maxDate={new Date()}
            inputFormat="YY/MM/DD"
            renderInput={params => {
              return (
                <div className="text-field-wrapper">
                  <Controller
                    control={control}
                    name={id}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        {...register(id)}
                        placeholder="YYMMDD"
                        value={value}
                        onChange={e => {
                          onChange(e);
                        }}
                        {...params}
                        sx={{
                          '& fieldset': { borderRadius: 0, border: 'none', borderBottom: 'solid 1px black' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              border: 'none',
                              borderBottom: 'solid 1px black',
                            },
                            '&.Mui-focused fieldset': {
                              border: 'none',
                              borderBottom: 'solid 1px black',
                            },
                          },
                          '&.MuiTextField-root': {
                            borderColor: 'black',
                          },
                          '& input': {
                            padding: 0,
                            border: 'none',
                          },
                          '& input::placeholder': {
                            fontFamily: 'Pretendard',
                            fontWeight: 400,
                            fontSize: '1rem',
                            color: '#c8c8c8',
                          },
                          padding: 0,
                        }}
                        inputProps={{
                          ...params?.inputProps,
                          style: {
                            padding: 0,
                            paddingTop: 8,
                            paddingBottom: 8,
                          },
                        }}
                      />
                    )}
                  />
                </div>
              );
            }}
          />
        </div>
        {!hideErrorMessage && (
          <div className="height-24">
            <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="error-text">{validMessage}</div>} />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default ActDatePicker2;
