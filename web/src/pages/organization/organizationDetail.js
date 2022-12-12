import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActButton from 'components/atoms/ActButton';
import { ReactComponent as Holt } from 'styles/assets/images/organizationLogo/circle/holt.svg';
import { ReactComponent as WorldVision } from 'styles/assets/images/organizationLogo/circle/world-vision.svg';
import { ReactComponent as WeBridge } from 'styles/assets/images/organizationLogo/circle/we-bridge.svg';
import { ReactComponent as Ksfp } from 'styles/assets/images/organizationLogo/circle/ksfp.svg';
import { ReactComponent as GoodNeighbors } from 'styles/assets/images/organizationLogo/circle/good-neighbors.svg';
import { ReactComponent as Home } from 'styles/assets/icons/home.svg';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import OrganizationCover from 'components/organisms/organization/OrganizationCover';
import OrganizationCampaign from 'components/organisms/organization/OrganizationCampaign';
import { DONATION_TYPE, ORGANIZATION_ID } from 'constants/constant';
import OrganizationNews from 'components/organisms/organization/OrganizationNews';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';

const OrganizationDetail = ({ setOption }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isSuccess, data, isError, error } = useReactQuery(`org-detail-${id}`, api.organization.detail(id));
  // const [data, setData] = useState(undefined);
  useEffect(() => {
    setOption({ title: '기부 단체', subtitle: '', description: '', back: true, menu: false });
  }, [setOption]);

  const onClickHandler = () => {
    navigate(`/donation`, { state: { organization: data.title, type: DONATION_TYPE.ORGANIZATION } });
  };

  const onClickHomepage = () => {
    window.open(data.homepageUrl, '_blank');
  };
  return (
    <div className="organization-detail-wrapper">
      {isSuccess && (
        <div className="organization-detail-intro-wrapper">
          <OrganizationCover item={data} />
          <div className="organization-detail-content-wrapper">
            <div className="organization-detail-description">{data.longDescription}</div>
            <div className="organization-detail-shortcut-wrapper">
              <Home />
              <div className="organization-detail-shortcut-label link" onClick={onClickHomepage}>
                홈페이지 바로가기
              </div>
            </div>
            <ActButton className="tertiary-button-x-large" handleOnClick={onClickHandler} label="후원하기" isDonation={true} />
          </div>
        </div>
      )}
      <div className="organization-detail-divider" />
      <OrganizationCampaign id={id} />
      <div className="organization-detail-divider" />
      <OrganizationNews id={id} />
    </div>
  );
};
export default OrganizationDetail;
