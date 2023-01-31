import React, { useContext, useEffect } from 'react';
import ActCheckBox from '../atoms/ActCheckBox';
import SettlementItem from './SettlementItem';

const SettlementItemCheckbox = ({ id, item, index, control, register, errors, watch, changeHandler }) => {
  return (
    <div className="row">
      <div className="payment-history-item-checkbox-wrapper">
        <ActCheckBox
          {...register(`${id}.${index}`)}
          id={`${id}.${index}`}
          checked={watch(`${id}.${index}`).checked}
          label=""
          errors={errors}
          control={control}
          item={item}
          handleChange={changeHandler}
          labelStyle={{ padding: 0 }}
        />
      </div>
      <SettlementItem item={item} />
    </div>
  );
};

export default SettlementItemCheckbox;
