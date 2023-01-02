import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import React, { useContext, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as ProfileIcon } from 'styles/assets/icons/profile/default.svg';
import { ReactComponent as ActIcon } from 'styles/assets/icons/label/act_aqua.svg';
import { ReactComponent as EmailIcon } from 'styles/assets/icons/email.svg';
import { ReactComponent as UserCheckIcon } from 'styles/assets/icons/user_check.svg';
import { ReactComponent as CardIcon } from 'styles/assets/icons/card.svg';
import { ReactComponent as HeartIcon } from 'styles/assets/icons/heart.svg';
import { authAtom, usersAtom } from 'state';
import { MEMBER_TYPE, ORGANIZATION_NEWS_TYPE } from 'constants/constant';
import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';
import { TokenContext } from 'utils/TokenContext';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_sm.svg';

const NavDrawer = ({ setOpen }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(usersAtom);
  const setUser = useSetRecoilState(usersAtom);
  const auth = useRecoilValue(authAtom);
  const { logout } = useContext(TokenContext);

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const { isSuccess, data } = useReactQuery('user-data', api.auth.my, { refetchOnWindowFocus: true, enabled: auth.authenticated });

  useEffect(() => {
    if (isSuccess && data) setUser(data);
  }, [isSuccess, data]);

  const PAGES =
    user?.userType === MEMBER_TYPE.ORGANIZATION
      ? [
          { url: '/organization', name: '단체캠페인' },
          { url: '/news/list', state: { type: ORGANIZATION_NEWS_TYPE.DISCLOSURE }, name: '단체 소식' },
          { url: '/news/list', state: { type: ORGANIZATION_NEWS_TYPE.DISCLOSURE }, name: '단체 공시' },
          { url: '/faq', name: 'FAQ' },
        ]
      : [
          { url: '/organization', name: '단체찾기' },
          { url: '/news/list', state: { type: ORGANIZATION_NEWS_TYPE.DISCLOSURE }, name: '공시보기' },
          { url: '/faq', name: 'FAQ' },
        ];

  return (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <div className="side-menu-wrap">
        {auth.authenticated ? (
          <div className="side-menu-login-menu-wrap">
            <div className="side-menu-wrap-profile-wrap link" onClick={() => navigate(user?.userType === MEMBER_TYPE.INDIVIDUAL ? 'my/profile-information' : 'org/profile')}>
              <div className="user-image">
                {user?.userType === MEMBER_TYPE.INDIVIDUAL ? user.info.profileUrl ? <img src={user.info.profileUrl} alt="user-profile-image" /> : <ProfileIcon /> : <ProfileIcon />}
              </div>
              <div className="side-menu-wrap-profile-info-wrap">
                <div className="side-menu-wrap-profile-name-wrap">
                  <div className="row max-width gap-8">
                    <div className="side-menu-wrap-profile-name">{user?.info.nickname || 'nickname'}</div>
                    {user?.userType === MEMBER_TYPE.INDIVIDUAL && <ActIcon />}
                    <div className="side-menu-wrap-profile-type">{user?.userType === MEMBER_TYPE.INDIVIDUAL ? '개인' : '단체'}</div>
                  </div>
                  <div className="row flex-auto justify-end padding-right-24">
                    <ArrowRight />
                  </div>
                </div>
                <div className="side-menu-wrap-profile-email-wrap">
                  <EmailIcon />
                  <div className="side-menu-wrap-profile-email">{user?.info.email}</div>
                </div>
              </div>
            </div>
            <div className="left-24 divider" />
            <div className="side-menu-donation-history-wrap">
              <div className="side-menu-donation-history">
                <div className="side-menu-donation-history-label">{user?.userType === MEMBER_TYPE.INDIVIDUAL ? '누적후원금액' : '후원받은금액'}</div>
                <div className="side-menu-donation-history-content">{user?.pgSummary.totalAmount.toLocaleString()}원</div>
              </div>
              <div className="side-menu-donation-history">
                <div className="side-menu-donation-history-label">정기후원금액</div>
                <div className="side-menu-donation-history-content">{user?.pgSummary.currentSubscriptionAmount.toLocaleString()}원</div>
              </div>
              <div className="side-menu-donation-history">
                <div className="side-menu-donation-history-label">{`${user?.userType === MEMBER_TYPE.INDIVIDUAL ? '후원건수' : '정산가능금액'}`}</div>
                <div className="side-menu-donation-history-content">
                  {user?.userType === MEMBER_TYPE.INDIVIDUAL
                    ? `${user?.pgSummary.totalSubscriptionCount} / ${user?.pgSummary.totalCount} 건`
                    : `${user?.pgSummary.withdrawAvailableAmount.toLocaleString()} 원`}
                </div>
              </div>
            </div>
            <div className="side-menu-donation-icon-menu-wrapper">
              <div
                className="side-menu-donation-icon-menu link"
                onClick={() => {
                  navigate(user?.userType === MEMBER_TYPE.INDIVIDUAL ? 'my/profile' : 'org/profile');
                }}
              >
                <UserCheckIcon />
                <div className="side-menu-donation-icon-menu-label">{user?.userType === MEMBER_TYPE.INDIVIDUAL ? '프로필정보' : '단체정보'}</div>
              </div>
              <div
                className="side-menu-donation-icon-menu link border-row"
                onClick={() => {
                  navigate(user?.userType === MEMBER_TYPE.INDIVIDUAL ? 'my/paymentHistory' : 'org/settlementHistory');
                }}
              >
                <CardIcon />
                <div className="side-menu-donation-icon-menu-label ">{user?.userType === MEMBER_TYPE.INDIVIDUAL ? '결제내역' : '정산내역'}</div>
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
        {auth.authenticated ? (
          <div className="flex-1 align-end">
            <div onClick={() => logout().then(() => navigate('/'))} className="side-menu-logout-label link">
              로그아웃
            </div>
          </div>
        ) : null}
      </div>
    </Box>
  );
};

export default NavDrawer;
