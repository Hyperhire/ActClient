import React, { useEffect, useRef, useState } from 'react';
import BannerManagerTabs from '../atoms/BannerManagerTabs';
import { OPERATION_MENU_TYPE } from '../../constants/constant';
import { api } from '../../repository';
import { useReactQuery } from '../../hooks/useReactQuery';
const ActBannerManager = ({ data, onFinish }) => {
  console.log('ActBannerManager', data);
  const MENU = [
    { label: '메인배너1', value: 'banner1' },
    { label: '메인배너2', value: 'banner2' },
    { label: '메인배너3', value: 'banner3' },
  ];
  return (
    <div>
      <BannerManagerTabs data={data} onFinish={() => onFinish()} />
    </div>
  );
};
export default ActBannerManager;
