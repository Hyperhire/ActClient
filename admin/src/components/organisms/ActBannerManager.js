import React, { useRef } from 'react';
import BannerManagerTabs from '../atoms/BannerManagerTabs';
const ActBannerManager = () => {
  const MENU = [
    { label: '메인배너1', value: 'banner1' },
    { label: '메인배너2', value: 'banner2' },
    { label: '메인배너3', value: 'banner3' },
  ];
  return (
    <div>
      <BannerManagerTabs menus={MENU} />
    </div>
  );
};
export default ActBannerManager;
