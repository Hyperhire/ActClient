import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActTab from 'components/atoms/ActTab';
import { ORGANIZATION_NEWS_TYPE } from 'constants/constant';
import OrganizationNewsItem from '../OrganizationNewsItem';
import OrganizationNewsImage1 from 'styles/assets/images/news/img.png';
import OrganizationNewsImage2 from 'styles/assets/images/news/img_1.png';
import OrganizationNewsImage3 from 'styles/assets/images/news/img_2.png';
import OrganizationNewsImage4 from 'styles/assets/images/news/img_3.png';
import OrganizationNewsImage5 from 'styles/assets/images/news/img_4.png';
import DisclosureItem from '../DisclosureItem';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { api } from '../../../repository';

const OrganizationNews = ({ id }) => {
  const navigate = useNavigate();
  const { isSuccess: newsSuccess, data: newsData } = useReactQuery(`org-news-list-${id}`, api.news.listByOrg(id));
  const { isSuccess: noticeSuccess, data: noticeData } = useReactQuery(`org-notice-list-${id}`, api.notice.listByOrg(id));

  const onClickHandler = (type, item) => {
    navigate(`/news/${item._id}`, { state: { type } });
  };

  const data = [
    {
      index: 0,
      label: '단체 소식',
      list: newsData.map((item, index) => {
        return (
          <div key={index}>
            <OrganizationNewsItem item={item} clickHandler={item => onClickHandler(ORGANIZATION_NEWS_TYPE.NEWS, item)} />
            {index !== newsData.length && <div className="divider" />}
          </div>
        );
      }),
    },
    {
      index: 1,
      label: '단체 공시',
      list: noticeData.map((item, index) => {
        return (
          <div key={index}>
            <DisclosureItem key={index} item={item} clickHandler={item => onClickHandler(ORGANIZATION_NEWS_TYPE.DISCLOSURE, item)} />
            {index !== noticeData.length && <div className="divider" />}
          </div>
        );
      }),
    },
  ];

  return <div className="col">{newsSuccess && noticeSuccess && <ActTab data={data} />}</div>;
};
export default OrganizationNews;
