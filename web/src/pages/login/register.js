import React, { useEffect, useState } from 'react';

const Register = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '회원가입', subtitle: '회원가입', description: '', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);
  return <div>Register</div>;
};

export default Register;
