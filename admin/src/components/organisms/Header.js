import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';
import ActTabs from 'components/atoms/ActTabs';
import { TokenContext } from '../../utils/TokenContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(TokenContext);
  const MENU = [
    { label: '회원관리', value: 'member' },
    { label: '단체관리', value: 'organization' },
    { label: '결제/정산', value: 'payment' },
    { label: '후원관리', value: 'donation' },
    { label: '운영관리', value: 'operation' },
  ];
  return (
    <div className="row align-center justify-center gap-24 padding-12">
      <Act />
      <ActTabs menus={MENU} initialValue={location.pathname.split('/')[1]} />
      <div className="link" onClick={() => logout().then(() => navigate('/'))}>
        로그아웃
      </div>
    </div>
  );
};

export default Header;
