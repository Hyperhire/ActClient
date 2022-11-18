import React, { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import ActButton from '../../components/atoms/ActButton';
import ActDrawer from '../../components/atoms/ActDrawer';

const FindPassword = ({ setOption }) => {
  const [drawerState, setDrawerState] = useState({ anchor: 'bottom', open: false, item: undefined });

  useEffect(() => {
    setOption({ title: '비밀번호 찾기', back: true, hideMenu: true });
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
