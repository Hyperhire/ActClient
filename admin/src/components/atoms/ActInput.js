import React, { forwardRef, useState, useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const ActInput = (props, ref) => {
  const {
    type = 'text',
    fontSize = '1rem',
    id,
    label,
    errors,
    control,
    placeholder,
    options,
    params,
    maxLength,
    handleChange,
    style,
    hideErrorMessage = false,
    actInputRef,
    disabled = false,
    multiline = false,
    rows = 1,
  } = props;

  const isEmptyObj = obj => {
    return obj.constructor === Object && Object.keys(obj).length === 0;
  };
  const isError = !isEmptyObj(errors) && errors[id];

  return (
    <div className="act-input-wrapper">
      {label && (
        <div className="label-wrapper">
          <div className="label">{label}</div>
        </div>
      )}
      <div className="text-field-area-wrapper">
        <Controller
          control={control}
          name={id}
          render={({ field }) => (
            <div className="text-field-wrapper" ref={params && params.inputRef}>
              <TextField
                ref={ref}
                select={type === 'select'}
                fullWidth
                type={type}
                maxLength={maxLength}
                variant="outlined"
                inputRef={ref => actInputRef && actInputRef(ref)}
                disabled={disabled}
                multiline={multiline}
                rows={rows}
                sx={{
                  '& fieldset': { borderRadius: 0, border: 'none', borderBottom: isError ? 'solid 1px red' : 'solid 1px black' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                      borderBottom: 'solid 1px black',
                      padding: 0,
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                      borderBottom: 'solid 1px black',
                      padding: 0,
                    },
                  },
                  '&.MuiTextField-root': {
                    borderColor: 'black',
                  },
                  '& input': {
                    padding: 0,
                  },
                  '& input::placeholder': {
                    fontFamily: 'Pretendard',
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#c8c8c8',
                  },
                  padding: 0,
                  ...style,
                }}
                inputProps={{
                  style: {
                    padding: 0,
                    paddingTop: 8,
                    paddingBottom: 8,
                  },
                  ...params?.inputProps,
                }}
                placeholder={placeholder}
                InputProps={{
                  style: {
                    fontSize: fontSize,
                  },
                  readOnly: false,
                }}
                {...field}
                onChange={e => {
                  if (maxLength && e.target.value.length > maxLength) return;
                  field.onChange(e);
                  if (handleChange) handleChange(e);
                }}
                value={field.value || ''}
              >
                {type === 'select' &&
                  options &&
                  options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          )}
        />
      </div>
      {!hideErrorMessage && (
        <div className="height-24">{isError && <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="error-text">{validMessage}</div>} />}</div>
      )}
    </div>
  );
};

export default forwardRef(ActInput);
