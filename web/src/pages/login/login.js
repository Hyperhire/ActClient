import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ActButton from 'components/atoms/ActButton';
import useLogin from 'hooks/useLogin';
import { loginYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import NavigationGuard from 'components/organisms/NavigationGuard';

const Login = ({ setOption }) => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const locationState = location.state;
  useEffect(() => {
    setOption({ title: '', subtitle: '로그인', description: '서비스 이용을 위해 로그인 해주세요.', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const loginDefaultForm = {
    userId: '',
    userPassword: '',
  };
  const formOptions = { defaultValues: loginDefaultForm, resolver: yupResolver(loginYup) };

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  const onClickEyeHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async data => {
    console.log('onSubmit', data);

    // setActiveGuard(false);
    // const postData = { ...data, status: statusCheck ? 1 : 0 };
    // updateUserBoard(postData);
    // if (await login({ userName: 'lucas', password: 'lucas123' })) {
    //   navigate(state ? state.from : '/', { replace: true });
    // }

    if (await login({ userName: data.userId, userPassword: data.userPassword })) {
      navigate(locationState ? locationState.from : '/', { state: { ...locationState } }, { replace: true });
    }
  };
  return (
    <div className="col max-height padding-row-8">
      <form className="padding-col-16" onSubmit={handleSubmit(onSubmit)}>
        <ActInput {...register('userId')} id="userId" placeholder="아이디를 입력하세요" errors={errors} control={control} />
        <ActInput
          {...register('userPassword')}
          type={showPassword ? 'text' : 'password'}
          id="userPassword"
          placeholder="비밀번호를 입력하세요 "
          errors={errors}
          control={control}
          eyeHandler={onClickEyeHandler}
        />
        <div className="row top-16 align-center justify-between">
          <FormGroup>
            <FormControlLabel control={<Checkbox {...register('isSave')} id="isSave" defaultChecked />} label="아이디저장" />
          </FormGroup>
          <div className="row align-center">
            <ActButton type="submit" disabled={!isValid} label="로그인" className="primary-button-x-large" />
          </div>
        </div>
      </form>
      <div className="flex-1 row align-end bottom-16">
        <div className="row">
          <div>(아이콘)</div>
          <div
            className="link"
            onClick={() => {
              navigate('/register');
            }}
          >
            회원가입
          </div>
        </div>
        <div className="light-grey left-4 right-4">|</div>
        <div
          className="link "
          onClick={() => {
            navigate('find-password');
          }}
        >
          비밀번호 찾기
        </div>
      </div>
    </div>
  );
};
export default Login;
