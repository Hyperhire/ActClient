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
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
const CampaignList = ({ setOption }) => {
  const { isSuccess, data } = useReactQuery('campaign-list', api.campaign.list);

  useEffect(() => {
    setOption({ title: '', subtitle: '진행중인 캠페인', description: '', back: true, menu: false });
  }, [setOption]);
  const navigate = useNavigate();

  const onClickHandler = item => {
    navigate(`/campaign/${item._id}`);
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
      {isSuccess &&
        data.map((item, index) => {
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
