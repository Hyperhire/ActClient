import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Holt } from 'styles/assets/images/organizationLogo/holt.svg';
import { ReactComponent as WorldVision } from 'styles/assets/images/organizationLogo/world-vision.svg';
import { ReactComponent as WeBridge } from 'styles/assets/images/organizationLogo/we-bridge.svg';
import { ReactComponent as Ksfp } from 'styles/assets/images/organizationLogo/ksfp.svg';
import { ReactComponent as GoodNeighbors } from 'styles/assets/images/organizationLogo/good-neighbors.svg';
import { ORGANIZATION_ID } from 'constants/constant';
import OrganizationItem from 'components/organisms/organization/OrganizationItem';

import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';

const OrganizationList = ({ setOption }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setOption({ title: '', subtitle: '기부 단체', description: '', back: true, menu: true });
  }, [setOption]);

  const { isLoading, isSuccess, data, isError, error } = useReactQuery('org-list', api.main.org);

  const onClickHandler = id => {
    navigate(`${id}`);
  };
  return (
    <div className="col">
      <div className="left-24 divider-thick-primary-2" />
      <div>
        {data.map((item, index) => {
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
