import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Holt } from 'styles/assets/images/organizationLogo/holt.svg';
import { ReactComponent as WorldVision } from 'styles/assets/images/organizationLogo/world-vision.svg';
import { ReactComponent as WeBridge } from 'styles/assets/images/organizationLogo/we-bridge.svg';
import { ReactComponent as Ksfp } from 'styles/assets/images/organizationLogo/ksfp.svg';
import { ReactComponent as GoodNeighbors } from 'styles/assets/images/organizationLogo/good-neighbors.svg';
import OrganizationItem from '../../components/organisms/organization/OrganizationItem';
import { ORGANIZATION_ID } from '../../constants/constant';

const OrganizationList = ({ setOption }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setOption({ title: '', subtitle: '기부 단체', description: '', back: true, menu: true });
  }, [setOption]);

  const makeDummy = () => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({ id: i, name: `name ${i}` });
    }
    return tmp;
  };

  const dummy = [
    {
      id: ORGANIZATION_ID.HOLT,
      label: '홀트아동복지회',
      donationStatus: true,
      description:
        '국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내 국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내 국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내 국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내',
      Logo: Holt,
    },
    {
      id: ORGANIZATION_ID.WORLD_VISION,
      label: '월드비전',
      donationStatus: false,
      description: '국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내',
      Logo: WorldVision,
    },
    {
      id: ORGANIZATION_ID.WE_BRIDGE,
      label: '위브릿지',
      donationStatus: true,
      description: '국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내',
      Logo: WeBridge,
    },
    {
      id: ORGANIZATION_ID.KSFP,
      label: '한국생명존중희망재단',
      donationStatus: false,
      description: '국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내',
      Logo: Ksfp,
    },
    {
      id: ORGANIZATION_ID.GOOD_NEIGHBORS,
      label: '굿네이버스',
      donationStatus: false,
      description: '국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내',
      Logo: GoodNeighbors,
    },
  ];
  const onClickHandler = id => {
    console.log('onClickHandler', id);
    navigate(`${id}`);
  };
  return (
    <div className="col">
      <div className="left-24 divider-thick-primary-2" />
      <div>
        {dummy.map((item, index) => {
          return (
            <div key={index}>
              <OrganizationItem item={item} clickHandler={onClickHandler} />
              <div className="divider" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrganizationList;
