import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { ORGANIZATION_NEWS_TYPE } from 'constants/constant';
import NewsDetailImage from 'styles/assets/images/news-detail.png';
import DisclosureDetailImage from 'styles/assets/images/disclosure-detail.png';
import ActCarousel from 'components/atoms/ActCarousel';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';

const NewsDetail = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state;
  const { id } = useParams();
  const { isSuccess, data, isError, error } = useReactQuery(
    type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? `notice-detail-${id}` : `news-detail-${id}`,
    type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? api.notice.detail(id) : api.news.detail(id),
  );

  useEffect(() => {
    if (!location.state) navigate(-1);
  }, [location.state, navigate]);

  useEffect(() => {
    setOption({ title: type === ORGANIZATION_NEWS_TYPE.NEWS ? '단체소식' : '단체공시', subtitle: data?.title, description: '', back: true, menu: false });
  }, [type, id, setOption, data?.title]);

  return (
    <div className="news-detail-wrapper">
      {isSuccess && data && (
        <div className="news-detail-content-wrapper">
          <div className="news-detail-content-carousel-wrapper">
            <ActCarousel
              items={data.images?.map(image => {
                return image;
              })}
              autoPlay={false}
              dotAnchor="left"
            />
          </div>
          <div className="news-detail-content-description-wrapper">
            <div className="news-detail-content-description">{data.description?.replace(/\\n/g, '\n')}</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewsDetail;
