import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';
import ActTabs from 'components/atoms/ActTabs';
import { TokenContext } from '../../utils/TokenContext';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(TokenContext);
  return (
    <div className="row align-center justify-center gap-24">
      <Act />
      <ActTabs />
      <div className="link" onClick={() => logout().then(() => navigate('/'))}>
        로그아웃
      </div>
    </div>
  );
};

export default Header;
