import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilValue } from 'recoil';
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
import { useLogin } from 'hooks/useReactMutation';
import { TokenContext } from 'utils/TokenContext';
import { LOGIN_TYPE, MEMBER_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';

const Login = ({ setOption }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;
  const { data, mutate: login, isLoading, isSuccess } = useLogin('login');
  const { onRefreshSuccess } = useContext(TokenContext);
  const { showModal } = useModal();
  useEffect(() => {
    if (isSuccess && data?.status === 200) {
      onRefreshSuccess({ token: data.data.data.token }).then(() => {
        if (data.data.data.userType === MEMBER_TYPE.INDIVIDUAL ? data.data.data.user.constant.isEmailVerified : data.data.data.org.constant.isEmailVerified) {
          if (locationState && locationState.to) {
            navigate(locationState.to, { state: { ...locationState }, replace: true });
          } else {
            navigate(`/`, { replace: true });
          }
        } else {
          navigate(`/verify`, { replace: true });
        }
      });
    }
  }, [data, isSuccess, locationState]);

  const [showPassword, setShowPassword] = useState(false);
  const onClickEyeHandler = () => {
    setShowPassword(!showPassword);
  };
  const [isSaveAccount, setIsSaveAccount] = useState(false);
  const onHandleChange = e => {
    setIsSaveAccount(e.target.checked);
  };

  useEffect(() => {
    setOption({ title: '', subtitle: '로그인', description: '서비스 이용을 위해 로그인 해주세요.', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const loginDefaultForm = {
    email: '',
    password: '',
    isSaveAccount: false,
  };
  const formOptions = { mode: 'onChange', defaultValues: loginDefaultForm, resolver: yupResolver(loginYup) };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm(formOptions);
  const passwordValue = getValues('password');

  useEffect(() => {
    if (passwordValue.length === 0) {
      setShowPassword(false);
    }
  }, [passwordValue]);

  const onSubmit = async formData => {
    login(formData);
  };

  const getIcon = values => {
    if (values && showPassword) {
      return <EyeClose />;
    }
    return <Eye />;
  };
  const socialLogin = type => {
    switch (type) {
      case 'kakao':
        navigate(`/redirect`, {
          state: {
            url: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code&scope=account_email`,
          },
        });
        break;
      case 'google':
        navigate(`/redirect`, {
          state: {
            url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`,
          },
        });
        break;
      case 'naver':
        console.log(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URL}&state=RANDOM_STATE`)
        navigate(`/redirect`, {
          state: {
            url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URL}&state=RANDOM_STATE`,
          },
        });
        break;
      case 'apple':
        navigate(`/redirect`, {
          state: {
            url: `https://appleid.apple.com/auth/authorize?redirect_uri=${process.env.REACT_APP_APPLE_REDIRECT_URL}&client_id=${process.env.REACT_APP_APPLE_CLIENT_ID}&response_type=code&state=origin:web&scope=email&response_mode=form_post`,
          },
        });
        break;
      default:
        showModal({
          open: true,
          message: `현재 지원하지 않는 기능입니다.`,
        });
        break;
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <ActInput {...register('email')} id="email" placeholder="아이디(이메일주소)를 입력해 주세요" errors={errors} control={control} />
        <ActInput
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="비밀번호를 입력해 주세요"
          errors={errors}
          control={control}
          eyeHandler={getValues('password').length > 0 && onClickEyeHandler}
          eyeIcon={getIcon(getValues('password'))}
        />
        <div className="login-form-submit-wrapper">
          <ActCheckBox {...register('isSaveAccount')} id="isSaveAccount" label="아이디 저장" errors={errors} control={control} checked={isSaveAccount} handleChange={onHandleChange} />
          <ActButton type="submit" disabled={!isValid || isLoading} label="로그인" className="button-medium" />
        </div>
      </form>
      <div className="login-form-sns-login-wrapper">
        <div className="login-form-sns-login-label">SNS 로그인</div>
        <div className="login-form-sns-login-logos">
          <div className="link" onClick={() => socialLogin('naver')}>
            <Naver />
          </div>
          <div className="link" onClick={() => socialLogin('kakao')}>
            <Kakao />
          </div>
          {/* <div className="link" onClick={() => socialLogin('apple')}>
            <Apple />
          </div> */}
          <div className="link" onClick={() => socialLogin('google')}>
            <Google />
          </div>
        </div>
      </div>
      <div className="login-form-text-button-wrapper">
        <div
          className="login-form-signup-button-wrapper link"
          onClick={() => {
            navigate('/register', { state: { loginType: LOGIN_TYPE.EMAIL }, replace: true });
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
