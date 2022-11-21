import React, { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import ActButton from '../../components/atoms/ActButton';
import ActDrawer from '../../components/atoms/ActDrawer';

const FindPassword = ({ setOption }) => {
  const [drawerState, setDrawerState] = useState({ anchor: 'bottom', open: false, item: undefined });

  useEffect(() => {
    setOption({ title: '비밀번호 찾기', subtitle: '임시 비밀번호를 보내드립니다.', description: '회원가입시 등록한 이메일 주소를 입력해주세요.', back: true, menu: false });
  }, [setOption]);

  const toggleDrawer = () => {
    setDrawerState({ ...drawerState, items: [<div className="background-test1">item1</div>, <div className="background-kakao">item2</div>], open: true });
  };
  return (
    <div>
      <div>FindPassword</div>
      <ActButton label="이메일을 확인하세요" handleOnClick={toggleDrawer} />
      <ActDrawer drawerState={[drawerState, setDrawerState]} />
    </div>
  );
};
export default FindPassword;
