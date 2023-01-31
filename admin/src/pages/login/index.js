import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { loginYup } from '../../utils/yupSchema';
import { useLogin } from '../../hooks/useReactMutation';
import ActInput from '../../components/atoms/ActInput';
import { TokenContext } from '../../utils/TokenContext';
import ActButton from '../../components/atoms/ActButton';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';
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
    <div className="col max-width max-height">
      <div className="flex-1 row align-center justify-center">
        <Act />
      </div>
      <form className="row flex-1 align-start justify-center " onSubmit={handleSubmit(onSubmit)}>
        <div className="row gap-16 align-center justify-center">
          <div className="col flex-1 align-center justify-center gap-16">
            <div className="row width-240 align-center justify-center ">
              <ActInput {...register('id')} id="id" placeholder="아이디를 입력해 주세요" errors={errors} control={control} />
            </div>
            <div className="row width-240 align-center justify-center ">
              <ActInput {...register('password')} type="password" id="password" placeholder="비밀번호를 입력해 주세요" errors={errors} control={control} />
            </div>
          </div>
          <div className="row flex-1 align-center justify-center">
            <ActButton type="submit" label={<div className="padding-24">로그인</div>} disabled={!isValid || isLoading} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
