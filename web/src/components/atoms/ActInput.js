import React, { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import ActButton from './ActButton';

const ActInput = (props, ref) => {
  const { type = 'text', fontSize = 18, required, info, id, label, errors, control, placeholder, disabled, eyeHandler, duplicateHandler, options, handleDataPicker, params, handleChange } = props;
  const isError = JSON.stringify(errors) !== '{}';
  return (
    <div className="col max-width align-start justify-center padding-col-8">
      {label && (
        <div className="row align-center">
          <div>{label}</div>
          {required ? <div className="red row align-center">*</div> : null}
          {info && (
            <div className="left-4 row align-center">
              <InfoOutlinedIcon fontSize="1rem" />
            </div>
          )}
        </div>
      )}
      <div className="row max-width align-center">
        <Controller
          control={control}
          name={id}
          render={({ field }) => (
            <div className="row align-center max-width" ref={params && params.inputRef}>
              <TextField
                ref={ref}
                select={type === 'select'}
                fullWidth
                type={type}
                variant="outlined"
                sx={{
                  '& fieldset': { borderRadius: 0, border: 'none', borderBottom: isError ? 'solid 1px red' : 'solid 1px black' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                      borderBottom: isError ? 'solid 1px red' : 'solid 1px black',
                      // borderColor: isError ? 'red' : 'black',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                      borderBottom: isError ? 'solid 1px red' : 'solid 1px yellow',
                      // borderColor: isError ? 'red' : 'black',
                    },
                  },
                  '&.MuiTextField-root': {
                    borderColor: isError ? 'red' : 'black',
                  },
                }}
                inputProps={{
                  ...params?.inputProps,
                }}
                placeholder={placeholder}
                InputProps={{
                  style: {
                    fontSize: fontSize,
                  },
                  readOnly: false,
                  endAdornment: eyeHandler ? (
                    <InputAdornment position="end">
                      <div className="row link align-center" onClick={() => eyeHandler()}>
                        <VisibilityOutlinedIcon fontSize="1rem" />
                      </div>
                    </InputAdornment>
                  ) : duplicateHandler ? (
                    <InputAdornment position="end">
                      <div className="row align-center">
                        <ActButton label="중복확인" disabled={disabled} handleOnClick={duplicateHandler} />
                      </div>
                    </InputAdornment>
                  ) : (
                    params?.InputProps && params?.InputProps.endAdornment
                  ),
                }}
                {...field}
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
      <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="red font-size-10">{validMessage}</div>} />
    </div>
  );
};

export default forwardRef(ActInput);
