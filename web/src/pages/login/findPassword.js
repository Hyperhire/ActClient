import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { findPasswordYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import ActButton from 'components/atoms/ActButton';
import useModal from '../../hooks/useModal';

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
    formState: { isValid, isSubmitting, errors },
  } = useForm(formOptions);

  const onSubmit = async data => {
    showModal({
      open: true,
      message: `비밀번호를 이메일로 전송하였습니다.`,
      handleConfirm: () => setError('email', { type: 'custom', message: '!가입 된 이메일이 아닙니다.' }),
    });

    // setActiveGuard(false);
    // const postData = { ...data, status: statusCheck ? 1 : 0 };
    // updateUserBoard(postData);
    // if (await login({ userName: 'lucas', password: 'lucas123' })) {
    //   navigate(state ? state.from : '/', { replace: true });
    // }
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
