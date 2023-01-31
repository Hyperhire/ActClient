import React, { forwardRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import ActButton from './ActButton';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';

const DuplicateButton = (props, ref) => {
  const { id, control, testValue, label, resultCallBack, disabled = true } = props;
  const checkDuplicated = async () => {
    const res = await request({
      url: id === 'duplicateEmail' ? api.auth.duplicateEmail(testValue) : id === 'duplicateNickname' && api.auth.duplicateNickname(testValue),
      method: 'get',
    });
    resultCallBack({ result: true, data: { status: res.data.data.duplicated, message: res.data.data.duplicated ? '이미 사용 중입니다.' : '사용할 수 있습니다.' } });
  };
  return <Controller control={control} name={id} render={props => <ActButton className="button-small" label={label} disabled={disabled} handleOnClick={checkDuplicated} {...props} />} />;
};

export default forwardRef(DuplicateButton);
