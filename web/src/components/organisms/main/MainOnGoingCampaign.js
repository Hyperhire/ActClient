import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignItem from 'components/organisms/CampaignItem';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_lg.svg';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { api } from '../../../repository';
const MainOnGoingCampaign = () => {
  const navigate = useNavigate();
  const query = `?limit=5`;
  const url = `${api.campaign.list}${query}`;
  const { isLoading, isSuccess, data, isError, error } = useReactQuery('main-campaign-list', url);
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
        data.list.map((item, index) => {
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
