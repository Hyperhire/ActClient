import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignItem from 'components/organisms/CampaignItem';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_lg.svg';
import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';
const OrganizationCampaign = ({ id }) => {
  const { isLoading, isSuccess, data, isError, error } = useReactQuery(`org-campaign-list-${id}`, api.campaign.listByOrg(id));
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/campaign`);
  };

  const onItemClickHandler = item => {
    navigate(`/campaign/${item._id}`);
  };

  return (
    <div className="campaign-list-wrapper">
      <div className="campaign-list-title-wrapper link" onClick={onClickHandler}>
        <div className="campaign-list-title">진행중인 캠페인</div>
        <ArrowRight />
      </div>
      {isSuccess &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <CampaignItem item={item} clickHandler={onItemClickHandler} />
              <div className="divider" />
            </div>
          );
        })}
    </div>
  );
};
export default OrganizationCampaign;
