import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DummyImage1 from 'styles/assets/images/mainKeyVisual/img2.png';
import DummyImage2 from 'styles/assets/images/mainKeyVisual/img3.png';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import { ReactComponent as Holt } from 'styles/assets/images/organizationLogo/circle/holt.svg';
import { ReactComponent as WorldVision } from 'styles/assets/images/organizationLogo/circle/world-vision.svg';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_sm.svg';
import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';

const MainSummaryOrganization = () => {
  const { isSuccess, data } = useReactQuery('main-org-list', api.main.org);

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('organization');
  };

  return (
    <div className="main-summary-organization-wrapper">
      <div className="list-wrapper">
        <div className="item-scroll-wrapper">
          {isSuccess &&
            data.map((item, index) => {
              return (
                <div key={index} className="item-wrapper">
                  {index % 2 ? (
                    <div className="item-image-top">
                      <img src={item?.image} alt="" />
                      <div className="organization-icon-bottom">
                        <img src={item?.icon} alt="" />
                      </div>
                    </div>
                  ) : (
                    <div className="item-image-bottom">
                      <img src={item?.image} alt="" />
                      <div className="organization-icon-top">
                        <img src={item?.icon} alt="" />
                      </div>
                    </div>
                  )}
                  <div className="item-title-wrapper">
                    <div className="item-title">{item.name}</div>
                    {item.donationStatus && (
                      <div className="item-chip">
                        <Give />
                      </div>
                    )}
                  </div>
                  <div className="item-description">{item.shortDescription}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="view-all-button-wrapper" onClick={onClickHandler}>
        <div className="view-all-button">
          <div className="label">기부단체 전체보기</div>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};
export default MainSummaryOrganization;
