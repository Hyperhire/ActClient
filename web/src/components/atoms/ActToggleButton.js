import React, { forwardRef, useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const ActToggleButton = (props, ref) => {
  const { control, id, items, errors, label, columns = 2, selectedItem, disabled = false } = props;
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    setSelected(undefined);
  }, [disabled]);

  useEffect(() => {
    if (selectedItem) selectedItem(selected);
  }, [selected, selectedItem]);

  const handleChange = (event, selectedItem) => {
    setSelected(selectedItem);
  };

  return (
    <div className="act-toggle-button-wrapper" ref={ref}>
      <div className="act-toggle-button-label">{label}</div>
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange } }) => (
          <ToggleButtonGroup
            fullWidth
            disabled={disabled}
            value={selected}
            exclusive
            onChange={(e, selectedItem) => {
              if (selectedItem !== null) {
                handleChange(e, selectedItem);
                onChange(selectedItem);
              }
            }}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {items?.map((item, index) => {
              return (
                <ToggleButton
                  key={item.value}
                  value={item.value}
                  sx={{
                    color: 'black',
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    '&.MuiToggleButton-root': {
                      backgroundColor: '#FAFAFA',
                      color: '#949494',
                      borderRadius: '0px',
                    },
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: 'black',
                      backgroundColor: 'white',
                      borderRadius: '0px',
                      fontWeight: 'bold',
                    },
                    '&.MuiToggleButtonGroup-grouped': {
                      borderRadius: '0px',
                      border: '1px solid #efefef !important',
                    },
                  }}
                  // style={{ outlineColor: '#efefef', outlineWidth: '1px', outlineStyle: 'solid' }}
                >
                  <div>{item.label}</div>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        )}
      />
      <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="error-text">{validMessage}</div>} />
    </div>
  );
};
export default forwardRef(ActToggleButton);
