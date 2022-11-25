import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterButton from 'components/organisms/RegisterButton';
import { MEMBER_TYPE } from '../../constants/constant';

const Register = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '회원가입', subtitle: 'ACT에\n오신 것을 환영합니다.', description: '회원유형을 선택해주세요', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const navigate = useNavigate();
  const onClickHandler = type => {
    console.log('onClickHandler', type);
    navigate(`${type}`);
  };
  return (
    <div className="col max-width padding-row-8 padding-col-16 gap-8">
      <RegisterButton type={MEMBER_TYPE.INDIVIDUAL} title="개인회원 가입" desc="기부단체를 찾으시나요?" clickHandler={onClickHandler} />
      <RegisterButton type={MEMBER_TYPE.ORGANIZATION} title="기부단체 가입" desc="기부단체이신가요?" clickHandler={onClickHandler} />
      <div className="row top-16">
        <div>[아이콘]</div>
        <div>이미 ACT 회원이신가요?</div>
      </div>
    </div>
  );
};

export default Register;
