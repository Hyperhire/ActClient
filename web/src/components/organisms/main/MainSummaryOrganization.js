import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DummyImage1 from 'styles/assets/images/mainKeyVisual/img2.png';
import DummyImage2 from 'styles/assets/images/mainKeyVisual/img3.png';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import { ReactComponent as Holt } from 'styles/assets/images/organizationLogo/circle/holt.svg';
import { ReactComponent as WorldVision } from 'styles/assets/images/organizationLogo/circle/world-vision.svg';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_sm.svg';

const MainSummaryOrganization = () => {
  const navigate = useNavigate();

  const makeDummy1 = () => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({
        organizationIcon: i % 2 ? Holt : WorldVision,
        image: i % 2 ? DummyImage2 : DummyImage1,
        title: i % 2 ? '홀트아동복지회' : '월드비전',
        description: i % 2 ? '지구촌 2억 명 어린이와 가족, 지역사회를 돕는 국제개발, 긴급구호, 사회복지 및 아동' : '국내입양, 가정위탁, 미혼모지원 등 주요사업, 후원 및 자원봉사 안내',
        donationStatus: !(i % 2),
        anchor: i % 2 ? 'bottom' : 'top',
      });
    }
    return tmp;
  };
  const onClickHandler = () => {
    navigate('organization');
  };
  return (
    <div className="main-summary-organization-wrapper">
      <div className="list-wrapper">
        <div className="item-scroll-wrapper">
          {makeDummy1().map((item, index) => {
            return (
              <div key={index} className="item-wrapper">
                <div className="item-image">
                  <img src={item?.image} alt="" />
                  {item.anchor === 'bottom' ? (
                    <div className="organization-icon-bottom">
                      <item.organizationIcon />
                    </div>
                  ) : (
                    <div className="organization-icon-top">
                      <item.organizationIcon />
                    </div>
                  )}
                </div>
                <div className="item-title-wrapper">
                  <div className="item-title">{item.title}</div>
                  {item.donationStatus && (
                    <div className="item-chip">
                      <Give />
                    </div>
                  )}
                </div>
                <div className="item-description">{item.description}</div>
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
