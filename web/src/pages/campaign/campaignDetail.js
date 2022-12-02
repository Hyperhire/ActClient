import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ActButton from 'components/atoms/ActButton';
import { DONATION_PAYMENT_TYPE, DONATION_TYPE } from 'constants/constant';
import CampaignDetailImage from 'styles/assets/images/campagin-detail.png';
import ActCarousel from 'components/atoms/ActCarousel';
import { ReactComponent as TwoPerson } from 'styles/assets/icons/2person.svg';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';

const CampaignDetail = ({ setOption }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    setOption({ title: '캠페인', subtitle: name, description: '', back: true, menu: false, chip: data?.organization === '굿네이버스' ? <Give /> : null });
  }, [data?.organization, name, setOption]);

  const onClickHandler = () => {
    navigate(`/donation`, { state: { organization: data?.organization, campaign: name, type: DONATION_TYPE.CAMPAIGN } });
  };

  const getData = id => {
    switch (id) {
      default:
        return {
          organization: '굿네이버스',
          images: [CampaignDetailImage, CampaignDetailImage, CampaignDetailImage],
          currentAmount: 4_000_000,
          targetAmount: 6_500_000,
          sponsorCount: 52,
          period: { startDate: '20221201', endDate: '20221225' },
          description:
            '여러분, SDG 5번 목표를 알고 계시나요? 바로 ‘성평등 달성 및 모든 여성과 여아의 권익 강화’ 입니다. \n\n지난 9월 20일 월드비전은 국제개발협력 포럼으로 유관기관 및 전문가들과 함께 통합적 접근에 기반한 여아 및 여성 권한증진사업의 성과를 공유하고 앞으로의 발전 방향을 논의하는 시간을 가졌습니다.',
        };
    }
  };

  useEffect(() => {
    if (data) console.log('set data', data);
  }, [data]);

  useEffect(() => {
    console.log('call get data');
    setTimeout(() => {
      setData(getData(name));
    }, 500);
  }, [name]);

  const dDay = () => {
    let today = dayjs();
    let expired_at = dayjs(data?.period?.endDate);
    let result = expired_at.diff(today, 'day', true);
    return Math.floor(result);
  };

  return (
    <div className="campaign-detail-wrapper">
      {data && (
        <div className="campaign-detail-content-wrapper">
          <div className="campaign-detail-content-organization-wrapper">
            <TwoPerson />
            <div className="campaign-detail-content-organization-label">{data.organization}</div>
          </div>
          <div className="campaign-detail-content-carousel-wrapper">
            <ActCarousel
              items={data?.images?.map(image => {
                return image;
              })}
              autoPlay={false}
              setParentData={setData}
              dotAnchor="left"
            />
          </div>
          <div className="campaign-detail-content-rate-wrapper">
            <div className="campaign-detail-content-rate-content">{Math.round((data?.currentAmount / data?.targetAmount) * 100)}% 달성</div>
            <div className="campaign-detail-content-rate-content">{`D-${dDay()}`}</div>
          </div>
          <div className="campaign-detail-divider" />
          <div className="campaign-detail-content-total-amount-wrapper">
            <div className="campaign-detail-content-amount-content">{`${data?.currentAmount?.toLocaleString()}원 후원 (${data?.sponsorCount}명)`}</div>
          </div>
          <div className="campaign-detail-content-target-wrapper">
            <div className="campaign-detail-content-target-content-wrapper">
              <div className="campaign-detail-content-target-label">목표금액</div>
              <div className="campaign-detail-content-target-content">{`${data?.targetAmount?.toLocaleString()}`}원</div>
            </div>
            <div className="campaign-detail-content-target-content-wrapper">
              <div className="campaign-detail-content-target-label">후원기간</div>
              <div className="campaign-detail-content-target-content">{`${dayjs(data?.period?.startDate).format('YYYY.MM.DD')} ~ ${dayjs(data?.period?.endDate).format('YYYY.MM.DD')}`}</div>
            </div>
          </div>
          <div className="campaign-detail-content-description-wrapper">
            <div className="campaign-detail-content-description">
              <div>
                {
                  '여러분, SDG 5번 목표를 알고 계시나요? 바로 ‘성평등 달성 및 모든 여성과 여아의 권익 강화’ 입니다. \n\n지난 9월 20일 월드비전은 국제개발협력 포럼으로 유관기관 및 전문가들과 함께 통합적 접근에 기반한 여아 및 여성 권한증진사업의 성과를 공유하고 앞으로의 발전 방향을 논의하는 시간을 가졌습니다.'
                }
              </div>
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
