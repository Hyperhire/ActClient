import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Facebook, Instagram } from '@mui/icons-material';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="background-white">
      <div className="footer-wrapper responsive-background-width margin-center">
        <div className="content col align-start justify-center font-weight-300 padding-16">
          <div className="menus row justify-between bottom-16">
            <li className="menu-item inline-block">
              <a href="https://cojam.gitbook.io/cojam-nft/terms-of-condition" target="_blank" rel="noreferrer noopener" className="name neutrals-2 neutrals-1-hover link font-size-14">
                서비스 이용약관
              </a>
            </li>
            <div className="light-grey left-4 right-4">|</div>
            <li className="menu-item inline-block">
              <a href="https://cojam.gitbook.io/cojam-nft/privacy" target="_blank" rel="noreferrer noopener" className="name neutrals-2 neutrals-1-hover link font-size-14">
                개인정보처리방침
              </a>
            </li>
          </div>
          <div className="menus justify-between">
            <li className="menu-item inline-block">코잼엔에프티 사업자정보(주)</li>
          </div>
          <div className="menus justify-between">
            <li className="menu-item inline-block">COJAM NFT Corp. All right reserved.</li>
          </div>
          <div className="menus justify-between top-16">
            <li className="menu-item inline-block">
              <a href="https://www.instagram.com/cojam_official/" target="_blank" rel="noreferrer noopener" className="link">
                <Instagram sx={{ fontSize: '1.5rem' }} />
              </a>
            </li>
            <li className="menu-item inline-block">
              <a href="https://www.facebook.com/cojam.limited/" target="_blank" rel="noreferrer noopener" className="link left-4">
                <Facebook sx={{ fontSize: '1.5rem' }} />
              </a>
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
