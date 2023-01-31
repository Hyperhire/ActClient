import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MEMBER_TYPE } from 'constants/constant';
import { ReactComponent as IndividualIcon } from 'styles/assets/icons/user_signup_1.svg';
import { ReactComponent as OrganizationIcon } from 'styles/assets/icons/user_signup_2.svg';
import { ReactComponent as UserCheckIcon } from 'styles/assets/icons/user_check.svg';
import { ReactComponent as ArrowRightIcon } from 'styles/assets/icons/arrow_line_right_lg.svg';

const RegisterSelectType = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '회원가입', subtitle: 'ACT에\n오신 것을 환영합니다.', description: '회원유형을 선택해주세요', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const navigate = useNavigate();
  const location = useLocation();
  const onClickRegisterHandler = type => {
    navigate(`${type}`, { state: { ...location.state } });
  };
  return (
    <div className="register-wrapper">
      <div className="register-button-wrapper" onClick={() => onClickRegisterHandler(MEMBER_TYPE.INDIVIDUAL)}>
        <div className="register-button-label-wrapper">
          <div className="register-button-info-label">기부단체를 찾으시나요?</div>
          <div className="register-button-title-label-wrapper">
            <div className="register-button-label">개인회원 가입</div>
            <ArrowRightIcon />
          </div>
        </div>
        <IndividualIcon />
      </div>
      <div className="register-organization-button-wrapper" onClick={() => onClickRegisterHandler(MEMBER_TYPE.ORGANIZATION)}>
        <div className="register-button-label-wrapper">
          <div className="register-button-info-label">기부단체이신가요?</div>
          <div className="register-button-title-label-wrapper">
            <div className="register-button-label">기부단체 가입</div>
            <ArrowRightIcon />
          </div>
        </div>
        <OrganizationIcon />
      </div>
      <div className="register-existing-member-wrapper link" onClick={() => navigate('/login')}>
        <UserCheckIcon />
        <div className="register-existing-member-label">이미 ACT 회원이신가요?</div>
      </div>
    </div>
  );
};

export default RegisterSelectType;
