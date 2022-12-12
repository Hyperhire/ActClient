import React, { forwardRef, useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { ErrorMessage } from '@hookform/error-message';
import ActCheckBox from 'components/atoms/ActCheckBox';

const ActCheckBoxGroup = (props, ref) => {
  const { register, control, parentId, items, label, labelStyle, errors, setValue } = props;
  const [checkBoxParent, setCheckBoxParent] = useState(false);
  const [checkBoxItems, setCheckBoxItems] = useState(items);

  useEffect(() => {
    setCheckBoxParent(checkBoxItems.every(item => item.checked));
    setValue(
      parentId,
      checkBoxItems.every(item => item.checked),
      { shouldValidate: true },
    );
  }, [checkBoxItems]);

  const onHandleChange = (e, id) => {
    if (id === parentId) {
      setCheckBoxItems(
        checkBoxItems.map(item => {
          return { ...item, checked: e.target.checked };
        }),
      );
    } else {
      const newArr = [...checkBoxItems];
      let newItem;
      newArr.splice(
        newArr.findIndex(item => {
          if (item.id === id) {
            newItem = item;
            return true;
          }
          return false;
        }),
        1,
        {
          ...newItem,
          checked: e.target.checked,
        },
      );
      setCheckBoxItems(newArr);
    }
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0 }}>
      {checkBoxItems.map((item, index) => {
        return <ActCheckBox {...register(item.id)} checked={item.checked} key={index} id={item.id} label={item.label} errors={errors} control={control} handleChange={onHandleChange} />;
      })}
    </Box>
  );

  return (
    <div ref={ref} className="act-check-box-group">
      <div className="act-check-boxes-wrapper">
        <ActCheckBox {...register(parentId)} id={parentId} checked={checkBoxParent} label={label} labelStyle={labelStyle} errors={errors} control={control} handleChange={onHandleChange} />
      </div>

      <div className="act-check-box-group-divider top-12 bottom-12" />
      <div className="act-check-boxes-wrapper">{children}</div>
      <ErrorMessage errors={errors} name={parentId} render={({ message: validMessage }) => <div className="red font-size-10">{validMessage}</div>} />
    </div>
  );
};

export default forwardRef(ActCheckBoxGroup);
