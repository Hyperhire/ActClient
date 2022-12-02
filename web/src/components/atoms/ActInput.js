import React, { forwardRef, useState, useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import ActButton from './ActButton';
import { ReactComponent as RedStar } from 'styles/assets/icons/star/red.svg';
import { ReactComponent as ToolTip } from 'styles/assets/icons/tooltip.svg';
import DuplicateButton from './duplicateButton';
const ActInput = (props, ref) => {
  const {
    type = 'text',
    fontSize = '1rem',
    required,
    info = false,
    id,
    label,
    errors,
    isValid,
    control,
    placeholder,
    disabled,
    eyeHandler,
    eyeIcon,
    duplicateMessage,
    options,
    params,
    fieldState,
    maxLength,
  } = props;
  const isError = !!(JSON.stringify(errors) !== '{}' && errors[id]);
  const [duplicatedResult, setDuplicatedResult] = useState({ message: duplicateMessage, result: undefined });

  // console.log('fieldState', fieldState);
  useEffect(() => {
    if (isError) {
      setDuplicatedResult({ ...duplicatedResult, result: undefined });
    }
  }, [isError]);

  const onResultCallBack = result => {
    setDuplicatedResult(result);
  };

  return (
    <div className="act-input-wrapper ">
      {label && (
        <div className="label-wrapper">
          <div className="label">{label}</div>
          {required ? <RedStar /> : null}
          {info && <ToolTip />}
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
                variant="outlined"
                sx={{
                  '& fieldset': { borderRadius: 0, border: 'none', borderBottom: isError ? 'solid 1px red' : 'solid 1px black' },
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
                  '& input::placeholder': {
                    fontFamily: 'Pretendard',
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#c8c8c8',
                  },

                  padding: 0,
                }}
                inputProps={{
                  style: {
                    padding: 0,
                    paddingTop: 8,
                    paddingBottom: 8,
                  },
                  ...params?.inputProps,
                  maxLength: maxLength,
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
                        {eyeIcon}
                      </div>
                    </InputAdornment>
                  ) : duplicateMessage ? (
                    <InputAdornment position="end">
                      <div className="duplication-button-wrapper">
                        <DuplicateButton id={id} label="중복" resultCallBack={onResultCallBack} disabled={fieldState.invalid} />
                      </div>
                    </InputAdornment>
                  ) : (
                    params?.InputProps && params?.InputProps.endAdornment
                  ),
                }}
                {...field}
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
      <div className="height-24">
        {isError ? (
          <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="error-text">{validMessage}</div>} />
        ) : (
          duplicatedResult.result && <div className="success-text">{duplicateMessage}</div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(ActInput);
