import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { findPasswordYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import ActButton from 'components/atoms/ActButton';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';

const FindPassword = ({ setOption }) => {
  const { showModal } = useModal();
  useEffect(() => {
    setOption({ title: '비밀번호 찾기', subtitle: '임시 비밀번호를\n이메일로 보내드립니다.', description: '회원가입시 등록한 이메일 주소를 입력해주세요.', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);

  const findPasswordDefaultForm = {
    userId: '',
  };
  const formOptions = { defaultValues: findPasswordDefaultForm, resolver: yupResolver(findPasswordYup) };

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm(formOptions);

  const onSubmit = async data => {
    const res = await request({
      url: api.auth.forgotPassword,
      method: 'post',
      data: { email: data.email },
    });
    if (res.status === 200) {
      showModal({
        open: true,
        message: `비밀번호를 이메일로 전송하였습니다.`,
      });
    } else {
      setError('email', { type: 'custom', message: res.response.data.error });
    }
  };

  return (
    <div className="find-password-wrapper">
      <form className="find-password-form" onSubmit={handleSubmit(onSubmit)}>
        <ActInput {...register('email')} id="email" placeholder="아이디(이메일 주소)를 입력해 주세요" errors={errors} control={control} />
        <div className="find-password-submit-wrapper">
          <ActButton className="button-medium" type="submit" disabled={!isValid} label="임시 비밀번호 보내기" />
        </div>
      </form>
    </div>
  );
};
export default FindPassword;
