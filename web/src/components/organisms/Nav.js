import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ReactComponent as Logo } from 'styles/assets/icons/logo/act.svg';
import { ReactComponent as Hamburger } from 'styles/assets/images/icons/hamburger.svg';
import { ReactComponent as ProfileIcon } from 'styles/assets/icons/profile/default.svg';
import { ReactComponent as ActIcon } from 'styles/assets/icons/label/act_aqua.svg';
import { ReactComponent as EmailIcon } from 'styles/assets/icons/email.svg';
import { ReactComponent as UserCheckIcon } from 'styles/assets/icons/user_check.svg';
import { ReactComponent as CardIcon } from 'styles/assets/icons/card.svg';
import { ReactComponent as HeartIcon } from 'styles/assets/icons/heart.svg';

import Back from 'components/atoms/Back';
import { authAtom } from 'state';

import { getItem, removeItem, USER_INFO } from '../../utils/sessionStorage';
import { AUTH_INFO, getLocalItem, removeLocalItem } from '../../utils/localStorage';
import { ORGANIZATION_NEWS_TYPE } from '../../constants/constant';

const Nav = ({ option = { title: 'title', subtitle: 'subtitle', description: 'description', back: false, menu: true } }) => {
  const [open, setOpen] = useState(false);
  const auth = useRecoilValue(authAtom);
  const authInfo = getLocalItem(AUTH_INFO);
  const userInfo = getItem(USER_INFO);
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useSetRecoilState(authAtom);
  const PAGES = [
    { url: '/organization', name: '단체찾기' },
    { url: '/news/list', state: { type: ORGANIZATION_NEWS_TYPE.DISCLOSURE }, name: '공시보기' },
    { url: '/faq', name: 'FAQ' },
  ];

  const logout = () => {
    setAuth(false);
    removeItem(USER_INFO);
    removeLocalItem(AUTH_INFO);
  };
  const list = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <div className="side-menu-wrap">
        {authInfo?.token ? (
          <div className="side-menu-login-menu-wrap">
            <div className="side-menu-wrap-profile-wrap">
              <ProfileIcon />
              <div className="side-menu-wrap-profile-info-wrap">
                <div className="side-menu-wrap-profile-name-wrap">
                  <div className="side-menu-wrap-profile-name">{userInfo?.nickname || 'nickname'}</div>
                  <ActIcon />
                  <div className="side-menu-wrap-profile-type">개인</div>
                </div>
                <div className="side-menu-wrap-profile-email-wrap">
                  <EmailIcon />
                  <div className="side-menu-wrap-profile-email">{userInfo?.email}</div>
                </div>
              </div>
            </div>
            <div className="left-24 divider" />
            <div className="side-menu-donation-history-wrap">
              <div className="side-menu-donation-history">
                <div className="side-menu-donation-history-label">누적후원금액</div>
                <div className="side-menu-donation-history-content">154,000원</div>
              </div>
              <div className="side-menu-donation-history">
                <div className="side-menu-donation-history-label">정기후원금액</div>
                <div className="side-menu-donation-history-content">40,000원</div>
              </div>
              <div className="side-menu-donation-history">
                <div className="side-menu-donation-history-label">후원건수</div>
                <div className="side-menu-donation-history-content">4/15건</div>
              </div>
            </div>
            <div className="side-menu-donation-icon-menu-wrapper">
              <div
                className="side-menu-donation-icon-menu link"
                onClick={() => {
                  navigate('my/profile');
                }}
              >
                <UserCheckIcon />
                <div className="side-menu-donation-icon-menu-label">프로필정보</div>
              </div>
              <div
                className="side-menu-donation-icon-menu link border-row"
                onClick={() => {
                  navigate('my/paymentHistory');
                }}
              >
                <CardIcon />
                <div className="side-menu-donation-icon-menu-label ">결제내역</div>
              </div>
              <div
                className="side-menu-donation-icon-menu link"
                onClick={() => {
                  navigate('my/donationHistory');
                }}
              >
                <HeartIcon />
                <div className="side-menu-donation-icon-menu-label">후원내역</div>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="side-menu-label">
            Login
          </Link>
        )}
        {PAGES.map((page, index) => (
          <Link key={index} to={page.url} state={page.state} className="side-menu-label">
            {page.name}
          </Link>
        ))}
        {authInfo?.token ? (
          <div className="flex-1 align-end">
            <div onClick={logout} className="side-menu-logout-label link">
              로그아웃
            </div>
          </div>
        ) : null}
      </div>
    </Box>
  );

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const onLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="max-width padding-row-24">
      <header className="nav-wrapper row align-center flex-auto">
        <div className="nav max-width flex-auto">
          <div className="nav-inside row align-center justify-between">
            <div className="flex-1 link" onClick={onLogoClick}>
              {option.back ? <Back size="1rem" /> : <Logo width="58" height="28" />}
            </div>
            <div className="flex-2">{option.title ? <div className="row max-width align-center justify-center">{option.title}</div> : null}</div>
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
      {option.subtitle && (
        <div className="subtitle-wrapper col gap-16">
          <div className="subtitle bold max-width pre-wrap">
            {option.subtitle}
            {option.chip && <span className="align-center">{option.chip}</span>}
            {option.button && <div className="subtitle-optional-button">{option.button}</div>}
          </div>
          {option.description && <div className="description">{option.description}</div>}
        </div>
      )}
      {option.date && <div className="subtitle-date">{dayjs(new Date()).locale('ko').format('YYYY.MM.DD a h:mm')}</div>}

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
