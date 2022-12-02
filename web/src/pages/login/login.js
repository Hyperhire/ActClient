import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import ActButton from 'components/atoms/ActButton';

import { loginYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import ActCheckBox from 'components/atoms/ActCheckBox';
import { ReactComponent as Naver } from 'styles/assets/icons/logo/naver.svg';
import { ReactComponent as Kakao } from 'styles/assets/icons/logo/kakao.svg';
import { ReactComponent as Apple } from 'styles/assets/icons/logo/apple.svg';
import { ReactComponent as Google } from 'styles/assets/icons/logo/google.svg';
import { ReactComponent as Signup } from 'styles/assets/icons/signup.svg';

import { ReactComponent as Eye } from 'styles/assets/icons/eye/eye.svg';
import { ReactComponent as EyeClose } from 'styles/assets/icons/eye/eye-off.svg';
import { api } from 'repository';
import { request } from '../../utils/axiosClient';
import { useLogin } from '../../hooks/useReactMutation';

const Login = ({ setOption }) => {
  const navigate = useNavigate();
  const { data, mutate: login, isLoading, isError, error, isSuccess } = useLogin('login');

  const [showPassword, setShowPassword] = useState(false);
  const onClickEyeHandler = () => {
    setShowPassword(!showPassword);
  };
  const [isSaveAccount, setIsSaveAccount] = useState(false);
  const onHandleChange = (e, id) => {
    setIsSaveAccount(e.target.checked);
  };
  const location = useLocation();
  const locationState = location.state;
  useEffect(() => {
    setOption({ title: '', subtitle: '로그인', description: '서비스 이용을 위해 로그인 해주세요.', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const loginDefaultForm = {
    userId: '',
    userPassword: '',
    isSaveAccount: false,
  };
  const formOptions = { mode: 'onChange', defaultValues: loginDefaultForm, resolver: yupResolver(loginYup) };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);
  const passwordValue = getValues('userPassword');

  useEffect(() => {
    if (passwordValue.length === 0) {
      setShowPassword(false);
    }
  }, [passwordValue]);
  const onSubmit = async formData => {
    console.log('onSubmit', formData);
    login(formData);
    // if (await login({ userName: data.userId, userPassword: data.userPassword })) {
    //   navigate(locationState ? locationState.from : '/', { state: { ...locationState } }, { replace: true });
    // }
  };

  const getIcon = values => {
    if (values && showPassword) {
      return <EyeClose />;
    }
    return <Eye />;
  };

  return (
    <div className="login-wrapper">
      <form className="login-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <ActInput {...register('userId')} id="userId" placeholder="아이디(이메일주소)를 입력해 주세요" errors={errors} control={control} />
        <ActInput
          {...register('userPassword')}
          type={showPassword ? 'text' : 'password'}
          id="userPassword"
          placeholder="비밀번호를 입력해 주세요"
          errors={errors}
          control={control}
          eyeHandler={getValues('userPassword').length > 0 && onClickEyeHandler}
          eyeIcon={getIcon(getValues('userPassword'))}
        />
        <div className="login-form-submit-wrapper">
          <ActCheckBox {...register('isSaveAccount')} id="isSaveAccount" label="아이디 저장" errors={errors} control={control} checked={isSaveAccount} handleChange={onHandleChange} />
          <ActButton type="submit" disabled={!isValid} label="로그인" className="button-medium" />
        </div>
      </form>
      <div className="login-form-sns-login-wrapper">
        <div className="login-form-sns-login-label">SNS 로그인</div>
        <div className="login-form-sns-login-logos">
          <Naver />
          <Kakao />
          <Apple />
          <Google />
        </div>
      </div>
      <div className="login-form-text-button-wrapper">
        <div
          className="login-form-signup-button-wrapper link"
          onClick={() => {
            navigate('/register');
          }}
        >
          <Signup />
          <div className="login-form-text-button-label ">회원가입</div>
        </div>
        <div className="login-form-signup-button-divider">|</div>
        <div
          className="login-form-text-button-label link"
          onClick={() => {
            navigate('/find-password');
          }}
        >
          비밀번호 찾기
        </div>
      </div>
    </div>
  );
};
export default Login;
