import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ReactComponent as Down } from 'styles/assets/icons/dropdown/black_down.svg';
import { ReactComponent as Instagram } from 'styles/assets/icons/insta.svg';
import { ReactComponent as FaceBook } from 'styles/assets/icons/facebook.svg';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer-wrapper">
      <div className="footer-terms-privacy-wrapper">
        <a href="https://cojam.gitbook.io/cojam-nft/terms-of-condition" target="_blank" rel="noreferrer noopener" className="terms-privacy-label link">
          서비스 이용약관
        </a>
        <div className="terms-privacy-label">|</div>
        <a href="https://cojam.gitbook.io/cojam-nft/privacy" target="_blank" rel="noreferrer noopener" className="terms-privacy-label link">
          개인정보처리방침
        </a>
      </div>
      <div className="business-information-wrapper">
        <div className="business-information-label">(주)코잼엔에프티 사업자정보</div>
        <Down stroke="#000000" />
      </div>

      <div className="copyright-wrapper">
        <div className="copyright-label">ⓒ COJAM NFT Corp. All rights reserved.</div>
      </div>
      <div className="icon-wrapper">
        <a href="https://www.instagram.com/cojam_official/" target="_blank" rel="noreferrer noopener" className="link">
          <Instagram />
        </a>
        <a href="https://www.facebook.com/cojam.limited/" target="_blank" rel="noreferrer noopener" className="link left-4">
          <FaceBook />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
