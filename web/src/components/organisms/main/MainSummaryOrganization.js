import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import { ReactComponent as ArrowRight } from 'styles/assets/icons/arrow_line_right_sm.svg';
import { useReactQuery } from 'hooks/useReactQuery';
import { api } from 'repository';

const MainSummaryOrganization = () => {
  const query = `?limit=4`;
  const url = `${api.main.org}${query}`;
  const { isSuccess, data } = useReactQuery('main-org-list', url);

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('organization');
  };

  const onClickItemHandler = item => {
    navigate(`organization/${item._id}`);
  };

  return (
    <div className="main-summary-organization-wrapper">
      <div className="list-wrapper">
        <div className="item-scroll-wrapper">
          {isSuccess &&
            data.list.map((item, index) => {
              return (
                <div key={index} className="item-wrapper link" onClick={() => onClickItemHandler(item)}>
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
