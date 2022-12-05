import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignImage1 from '../../styles/assets/images/campaign/img1.png';
import { ReactComponent as TwoPerson } from '../../styles/assets/icons/2person.svg';
import CampaignImage2 from '../../styles/assets/images/campaign/img2.png';
import CampaignImage3 from '../../styles/assets/images/campaign/img3.png';
import CampaignImage4 from '../../styles/assets/images/campaign/img4.png';
import CampaignImage5 from '../../styles/assets/images/campaign/img5.png';
import { ReactComponent as ArrowRight } from '../../styles/assets/icons/arrow_line_right_lg.svg';
import CampaignItem from '../../components/organisms/CampaignItem';
import ActSearchBar from '../../components/atoms/ActSearchBar';
import { SEARCH_TYPE } from '../../constants/constant';
const CampaignList = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '', subtitle: '진행중인 캠페인', description: '', back: true, menu: false });
  }, [setOption]);
  const navigate = useNavigate();
  const dummy = [
    {
      image: CampaignImage1,
      OrganizationIcon: TwoPerson,
      organizationLabel: '굿네이버스',
      title: 'Basic for Girls 면생리대 캠페인 블라블라',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage2,
      OrganizationIcon: TwoPerson,
      organizationLabel: '월드비전',
      title: '2022 크리스마스 선물보내기',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage3,
      OrganizationIcon: TwoPerson,
      organizationLabel: '홀트아동복지회',
      title: '해외후원아동 꿈응원 캠페인 금쪽같은 블라블라 해외후원아동 꿈응원 캠페인 금쪽같은 블라블라',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage4,
      OrganizationIcon: TwoPerson,
      organizationLabel: '굿네이버스',
      title: '해외여자 지원 캠페인 소녀의 여름',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage5,
      OrganizationIcon: TwoPerson,
      organizationLabel: '월드비전',
      title: 'Basic for Girls 면생리대 캠페인 블라블라',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage1,
      OrganizationIcon: TwoPerson,
      organizationLabel: '굿네이버스',
      title: 'Basic for Girls 면생리대 캠페인 블라블라',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage2,
      OrganizationIcon: TwoPerson,
      organizationLabel: '월드비전',
      title: '2022 크리스마스 선물보내기',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage3,
      OrganizationIcon: TwoPerson,
      organizationLabel: '홀트아동복지회',
      title: '해외후원아동 꿈응원 캠페인 금쪽같은 블라블라 해외후원아동 꿈응원 캠페인 금쪽같은 블라블라',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage4,
      OrganizationIcon: TwoPerson,
      organizationLabel: '굿네이버스',
      title: '해외여자 지원 캠페인 소녀의 여름',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
    {
      image: CampaignImage5,
      OrganizationIcon: TwoPerson,
      organizationLabel: '월드비전',
      title: 'Basic for Girls 면생리대 캠페인 블라블라',
      rate: 320,
      amount: 545_000,
      remainingPeriod: 24,
    },
  ];
  const makeDummy = () => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({
        image: `image ${i}`,
        organizationIcon: `organizationIcon ${i}`,
        organizationLabel: `organizationLabel ${i}`,
        title: `title ${i}`,
        rate: `rate ${i}`,
        amount: `amount ${i}`,
        remainingPeriod: `remainingPeriod ${i}`,
      });
    }
    return tmp;
  };

  const onHandleChange = () => {
    navigate(`campaign`);
  };

  const onClickHandler = item => {
    navigate(`/campaign/${item.title}`);
  };

  const onSearchResultData = data => {
    console.log('onSearchResultData', data);
  };
  return (
    <div className="campaign-list-wrapper">
      <div className="campaign-list-search-bar-wrapper">
        <ActSearchBar type={SEARCH_TYPE.CAMPAIGN} searchResultData={onSearchResultData} />
      </div>
      <div className="left-24 divider-thick-primary-2" />
      {dummy.map((item, index) => {
        return (
          <div key={index}>
            <CampaignItem item={item} clickHandler={onClickHandler} />
            <div className="divider" />
          </div>
        );
      })}
    </div>
  );
};

export default CampaignList;
