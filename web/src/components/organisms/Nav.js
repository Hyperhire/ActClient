import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as Logo } from 'assets/images/logos/cojam_logo.svg';
import { ReactComponent as Hamburger } from 'assets/images/icons/hamburger.svg';
import useResize from 'hooks/useResize';
import Back from 'components/atoms/Back';
import { authAtom } from 'state';
import useLogin from '../../hooks/useLogin';
import { getItem, USER_INFO } from '../../utils/sessionStorage';

const Nav = ({ option = { title: 'title', subtitle: 'subtitle', description: 'description', back: false, menu: true } }) => {
  const [open, setOpen] = useState(false);
  const auth = useRecoilValue(authAtom);
  const { logout } = useLogin();
  const userInfo = getItem(USER_INFO);
  console.log('userInfo', userInfo);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('option', option);
  const rootRef = useRef();
  const { width, height } = useResize(rootRef);

  const PAGES = [
    { url: '/organization', name: '단체찾기' },
    { url: '/disclosure', name: '공시보기' },
    { url: '/faq', name: 'FAQ' },
  ];
  const list = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          {auth ? (
            <div className="col max-width left-16">
              <div className="row padding-col-16 divider ">
                <div className="row align-center justify-center">아이콘</div>
                <div className="col">
                  <div className="row">
                    <div>{userInfo.userName}</div>
                    <div>개인</div>
                  </div>
                  <div>abc@naver.com</div>
                </div>
              </div>
              <div className="col padding-col-16">
                <div className="row align-center">
                  <div className="flex-1">누적후원금액</div>
                  <div className="flex-2">154,000원</div>
                </div>
                <div className="row align-center">
                  <div className="flex-1">정기후원금액</div>
                  <div className="flex-2">40,000원</div>
                </div>
                <div className="row align-center">
                  <div className="flex-1">후원건수</div>
                  <div className="flex-2">4/15건</div>
                </div>
              </div>
              <div className="row background-kakao right-16">
                <div className="col flex-1 justify-center align-center">
                  <div>아이콘</div>
                  <div>프로필정보</div>
                </div>
                <div className="col flex-1 justify-center align-center">
                  <div>아이콘</div>
                  <div>결제내역</div>
                </div>
                <div className="col flex-1 justify-center align-center">
                  <div>아이콘</div>
                  <div>후원내역</div>
                </div>
              </div>
            </div>
          ) : (
            <ListItemButton>
              <Link to="/login" className="title grey font-24 font-weight-700">
                Login
              </Link>
            </ListItemButton>
          )}
        </ListItem>
        {PAGES.map((page, index) => (
          <ListItem key={`page.name${index}`} disablePadding>
            <ListItemButton>
              <Link to={page.url} className="title grey font-24 font-weight-700">
                {page.name}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        {auth ? (
          <ListItem disablePadding>
            <div>
              <ListItemButton>
                <div onClick={() => logout()} className="grey small underline">
                  로그아웃
                </div>
              </ListItemButton>
            </div>
          </ListItem>
        ) : null}
      </List>
    </Box>
  );

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div ref={rootRef} className="max-width padding-row-8">
      <header className="nav-wrapper row align-center flex-auto ">
        <div className="nav max-width flex-auto header-zindex">
          <div className="nav-inside row align-center justify-between ">
            <div className="flex-1">{option.back ? <Back size="1rem" /> : <div>ACT</div>}</div>
            <div className="flex-1">{option.title ? <div className="row max-width align-center justify-center">{option.title}</div> : null}</div>
            <div className="flex-1 row max-width align-center justify-end">
              {option.menu ? (
                <div className="row max-width align-center justify-end">
                  <button className="hamburger link" onClick={toggleDrawer(true)}>
                    <Hamburger />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <div className="subtitle-wrapper col padding-col-16">
        <div className="subtitle bold half-width">{option.subtitle}</div>
        <div className="description">{option.description}</div>
      </div>
      <SwipeableDrawer
        PaperProps={{
          sx: { width: '80%' },
        }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default Nav;
