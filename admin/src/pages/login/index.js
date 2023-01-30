import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { loginYup } from '../../utils/yupSchema';
import { useLogin } from '../../hooks/useReactMutation';
import ActInput from '../../components/atoms/ActInput';
import { TokenContext } from '../../utils/TokenContext';

const Login = () => {
  const { data, mutate: login, isLoading, isSuccess } = useLogin('login');
  const { onRefreshSuccess } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data?.status === 200) {
      console.log('Login useEffect');
      onRefreshSuccess({ token: data.data.data.token }).then(() => {
        navigate(`/member`, { replace: true });
      });
    }
  }, [data, isSuccess]);

  const loginDefaultForm = {
    id: '',
    password: '',
  };
  const formOptions = { mode: 'onChange', defaultValues: loginDefaultForm, resolver: yupResolver(loginYup) };
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm(formOptions);

  const onSubmit = async formData => {
    login(formData);
  };
  return (
    <div className="col">
      <div>액트</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ActInput {...register('id')} id="id" placeholder="아이디를 입력해 주세요" errors={errors} control={control} />
        <ActInput {...register('password')} type="password" id="password" placeholder="비밀번호를 입력해 주세요" errors={errors} control={control} />
        <button type="submit" disabled={!isValid || isLoading}>
          로그인
        </button>
      </form>
    </div>
  );
};
export default Login;
