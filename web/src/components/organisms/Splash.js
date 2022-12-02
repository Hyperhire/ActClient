import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from 'styles/assets/icons/logo/act.svg';
import { ReactComponent as Cojam } from 'styles/assets/icons/cojam.svg';
const Splash = ({ firstLoad }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!firstLoad) {
      setTimeout(() => {
        setActive(true);
      }, 1000);
    }
  }, [firstLoad]);
  return (
    <div className={`splash ${!firstLoad && 'fade-out'} ${active && 'active-main'}`}>
      <div className="col max-width max-height-vh align-center">
        <div className="flex-1 row align-center">
          <Logo />
        </div>
        <div className="col align-center gap-12 bottom-32">
          <Cojam />
          <div className="body-small title-text">ⓒ COJAM NFT Corp. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};
export default Splash;
