import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignItem from 'components/organisms/CampaignItem';
import CampaignImage1 from 'styles/assets/images/campaign/img1.png';
import CampaignImage2 from 'styles/assets/images/campaign/img2.png';
import CampaignImage3 from 'styles/assets/images/campaign/img3.png';
import CampaignImage4 from 'styles/assets/images/campaign/img4.png';
import CampaignImage5 from 'styles/assets/images/campaign/img5.png';
import { ReactComponent as TwoPerson } from 'styles/assets/icons/2person.svg';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_lg.svg';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { api } from '../../../repository';
const MainOnGoingCampaign = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, data, isError, error } = useReactQuery('main-campaign-list', api.campaign.list);

  const onClickNavigateHandler = () => {
    navigate(`campaign`);
  };

  const onClickHandler = item => {
    navigate(`/campaign/${item._id}`);
  };

  return (
    <div className="campaign-list-wrapper">
      <div className="campaign-list-title-wrapper link" onClick={onClickNavigateHandler}>
        <div className="campaign-list-title">진행중인 캠페인</div>
        <ArrowRight />
      </div>
      {isSuccess &&
        data.slice(0, 5).map((item, index) => {
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
export default MainOnGoingCampaign;
