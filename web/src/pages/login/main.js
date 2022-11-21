import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActButton from 'components/atoms/ActButton';
import useLogin from 'hooks/useLogin';

const LoginMain = ({ setOption }) => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const { state } = useLocation();
  console.log('state', state);

  useEffect(() => {
    setOption({ title: '', subtitle: '로그인', description: '서비스 이용을 위해 로그인 해주세요.', back: true, menu: true });
  }, [setOption]);

  return (
    <div>
      <div>login page</div>
      <div className="col">
        <ActButton
          label="로그인"
          handleOnClick={async () => {
            if (await login({ userName: 'lucas', password: 'lucas123' })) {
              navigate(state ? state.from : '/');
            }
          }}
        />
        <div className="row">
          <ActButton
            label="회원가입"
            handleOnClick={() => {
              navigate('register');
            }}
          />
          <ActButton
            label="비밀번호 찾기"
            handleOnClick={() => {
              navigate('find-password');
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginMain;
