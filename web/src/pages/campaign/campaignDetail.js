import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ActButton from 'components/atoms/ActButton';
import { DONATION_PAYMENT_TYPE, DONATION_TYPE } from 'constants/constant';
import CampaignDetailImage from 'styles/assets/images/campagin-detail.png';
import ActCarousel from 'components/atoms/ActCarousel';
import { ReactComponent as TwoPerson } from 'styles/assets/icons/2person.svg';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';

const CampaignDetail = ({ setOption }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isSuccess, data, isError, error } = useReactQuery(`campaign-detail-${id}`, api.campaign.detail(id));

  useEffect(() => {
    setOption({ title: '캠페인', subtitle: data?.title, description: '', back: true, menu: false, chip: data?.org.name === '굿네이버스' ? <Give /> : null });
  }, [data, setOption]);

  const onClickHandler = () => {
    navigate(`/donation`, { state: { item: data, type: DONATION_TYPE.CAMPAIGN } });
  };

  const dDay = () => {
    let today = dayjs();
    let expired_at = dayjs(data?.endedAt);
    let result = expired_at.diff(today, 'day', true);
    return Math.floor(result);
  };

  return (
    <div className="campaign-detail-wrapper">
      {isSuccess && data && (
        <div className="campaign-detail-content-wrapper">
          <div className="campaign-detail-content-organization-wrapper">
            <TwoPerson />
            <div className="campaign-detail-content-organization-label">{data.org.name}</div>
          </div>
          <div className="campaign-detail-content-carousel-wrapper">
            <ActCarousel
              items={data.images?.map(image => {
                return image;
              })}
              autoPlay={false}
              dotAnchor="left"
            />
          </div>
          <div className="campaign-detail-content-rate-wrapper">
            <div className="campaign-detail-content-rate-content">{Math.round((data.currentAmount / data.targetAmount) * 100)}% 달성</div>
            <div className="campaign-detail-content-rate-content">{`D-${dDay()}`}</div>
          </div>
          <div className="campaign-detail-divider" />
          <div className="campaign-detail-content-total-amount-wrapper">
            <div className="campaign-detail-content-amount-content">{`${data.currentAmount?.toLocaleString()}원 후원 (${data.numberOfDonor.toLocaleString()}명)`}</div>
          </div>
          <div className="campaign-detail-content-target-wrapper">
            <div className="campaign-detail-content-target-content-wrapper">
              <div className="campaign-detail-content-target-label">목표금액</div>
              <div className="campaign-detail-content-target-content">{`${data.targetAmount?.toLocaleString()}`}원</div>
            </div>
            <div className="campaign-detail-content-target-content-wrapper">
              <div className="campaign-detail-content-target-label">후원기간</div>
              <div className="campaign-detail-content-target-content">{`${dayjs(data.startedAt).format('YYYY.MM.DD')} ~ ${dayjs(data.endedAt).format('YYYY.MM.DD')}`}</div>
            </div>
          </div>
          <div className="campaign-detail-content-description-wrapper">
            <div className="campaign-detail-content-description">
              <div>{data.description}</div>
            </div>
          </div>
        </div>
      )}
      <div className="campaign-detail-button-wrapper">
        <ActButton label="캠페인 후원하기" className="primary-button-x-large" handleOnClick={onClickHandler} />
      </div>
    </div>
  );
};
export default CampaignDetail;
