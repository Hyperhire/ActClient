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

const OrganizationDetail = ({ setOption }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setOption({ title: '기부 단체', subtitle: '', description: '', back: true, menu: false });
  }, [setOption]);

  const getData = id => {
    switch (id) {
      case ORGANIZATION_ID.HOLT:
        return {
          title: '홀트아동복지회',
          subTitle: '지구촌 2억 명 어린이와 가족, 지역사회를 돕는 국제개발, 긴급구호, 사회복지 및 아동보호',
          description:
            '월드비전은 70년 전, 한국전쟁의 폐허 속에서 태어났습니다. 1991년 한국월드비전은 도움을 받던 나라에서 주는 나라로 역사적인 전환을 이루었습니다.\n\n 2006년 한국월드비전은 구호사업의 전문성을 인정 받아 WFP(유엔세계식량계획) 공식협력기관이 되었습니다.',
          Icon: Holt,
        };

      case ORGANIZATION_ID.WORLD_VISION:
        return {
          title: '월드비전',
          subTitle: '지구촌 2억 명 어린이와 가족, 지역사회를 돕는 국제개발, 긴급구호, 사회복지 및 아동보호',
          description:
            '월드비전은 70년 전, 한국전쟁의 폐허 속에서 태어났습니다. 1991년 한국월드비전은 도움을 받던 나라에서 주는 나라로 역사적인 전환을 이루었습니다.\n\n 2006년 한국월드비전은 구호사업의 전문성을 인정 받아 WFP(유엔세계식량계획) 공식협력기관이 되었습니다.',
          Icon: WorldVision,
        };
      case ORGANIZATION_ID.WE_BRIDGE:
        return {
          title: '위브릿지',
          subTitle: '지구촌 2억 명 어린이와 가족, 지역사회를 돕는 국제개발, 긴급구호, 사회복지 및 아동보호',
          description:
            '월드비전은 70년 전, 한국전쟁의 폐허 속에서 태어났습니다. 1991년 한국월드비전은 도움을 받던 나라에서 주는 나라로 역사적인 전환을 이루었습니다.\n\n 2006년 한국월드비전은 구호사업의 전문성을 인정 받아 WFP(유엔세계식량계획) 공식협력기관이 되었습니다.',
          Icon: WeBridge,
        };
      case ORGANIZATION_ID.KSFP:
        return {
          title: '한국생명존중희망재단',
          subTitle: '지구촌 2억 명 어린이와 가족, 지역사회를 돕는 국제개발, 긴급구호, 사회복지 및 아동보호',
          description:
            '월드비전은 70년 전, 한국전쟁의 폐허 속에서 태어났습니다. 1991년 한국월드비전은 도움을 받던 나라에서 주는 나라로 역사적인 전환을 이루었습니다.\n\n 2006년 한국월드비전은 구호사업의 전문성을 인정 받아 WFP(유엔세계식량계획) 공식협력기관이 되었습니다.',
          Icon: Ksfp,
        };
      case ORGANIZATION_ID.GOOD_NEIGHBORS:
        return {
          title: '굿네이버스',
          subTitle: '지구촌 2억 명 어린이와 가족, 지역사회를 돕는 국제개발, 긴급구호, 사회복지 및 아동보호',
          description:
            '월드비전은 70년 전, 한국전쟁의 폐허 속에서 태어났습니다. 1991년 한국월드비전은 도움을 받던 나라에서 주는 나라로 역사적인 전환을 이루었습니다.\n\n 2006년 한국월드비전은 구호사업의 전문성을 인정 받아 WFP(유엔세계식량계획) 공식협력기관이 되었습니다.',
          Icon: GoodNeighbors,
        };
      default:
        return {};
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setData(getData(id));
    }, 500);
  }, [id]);

  const onClickHandler = () => {
    navigate(`/donation`, { state: { organization: data.title, type: DONATION_TYPE.ORGANIZATION } });
  };

  return (
    <div className="organization-detail-wrapper">
      <div className="organization-detail-intro-wrapper">
        {data && <OrganizationCover item={data} />}
        <div className="organization-detail-content-wrapper">
          {data && <div className="organization-detail-description">{data.description}</div>}
          <div className="organization-detail-shortcut-wrapper">
            <Home />
            <div className="organization-detail-shortcut-label">홈페이지 바로가기</div>
          </div>
          <ActButton className="tertiary-button-x-large" handleOnClick={onClickHandler} label="후원하기" isDonation={true} />
        </div>
      </div>
      <div className="organization-detail-divider" />
      <OrganizationCampaign />
      <div className="organization-detail-divider" />
      <OrganizationNews />
    </div>
  );
};
export default OrganizationDetail;
