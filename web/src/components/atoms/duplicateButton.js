import React, { useState } from 'react';
import ActButton from './ActButton';

const DuplicateButton = ({ testValue, label, resultCallBack, disabled = true }) => {
  const checkDuplicated = () => {
    setTimeout(() => {
      // resultCallBack({ result: true, data: { status: 400, message: '사용불가' } });
      resultCallBack({ result: true, data: { status: 200, message: '사용가능' } });
    }, 1);
  };
  return <ActButton className="button-small" label={label} disabled={disabled} handleOnClick={checkDuplicated} />;
};
export default DuplicateButton;
