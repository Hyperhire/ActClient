import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActButton from '../../components/atoms/ActButton';

const Login = ({ setOption }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setOption({ title: 'Login', back: true });
  }, [setOption]);
  return (
    <div>
      <div>login page</div>
      <ActButton
        label="비밀번호 찾기"
        handleOnClick={() => {
          navigate('find-password');
        }}
      />
    </div>
  );
};
export default Login;
