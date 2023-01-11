import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';
import ActTabs from 'components/atoms/ActTabs';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="row align-center justify-center gap-24">
      <div className="link" onClick={() => navigate('/')}>
        <Act />
      </div>
      <ActTabs />
      <div>logout</div>
    </div>
  );
};

export default Header;
