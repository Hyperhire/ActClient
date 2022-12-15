import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSummaryOrganization from 'components/organisms/main/MainSummaryOrganization';
import MainOnGoingCampaign from 'components/organisms/main/MainOnGoingCampaign';
import MainDisclosure from 'components/organisms/main/MainDisclosure';
import MainFaq from 'components/organisms/main/MainFaq';
const MainCarousel = lazy(() => import('components/organisms/main/MainCarousel'));
const Footer = lazy(() => import('components/organisms/Footer'));

const Main = ({ setOption }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setOption({ title: '', back: false, menu: true });
    return () => setOption({});
  }, [setOption]);

  return (
    <div className="max-width max-height col">
      <MainCarousel />
      <MainSummaryOrganization />
      <MainOnGoingCampaign />
      <MainDisclosure />
      <MainFaq />
      <Footer />
    </div>
  );
};
export default Main;
