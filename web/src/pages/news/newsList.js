import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActSearchBar from 'components/atoms/ActSearchBar';
import { ORGANIZATION_NEWS_TYPE, SEARCH_TYPE } from 'constants/constant';
import OrganizationNewsImage1 from 'styles/assets/images/news/img.png';
import OrganizationNewsImage2 from 'styles/assets/images/news/img_1.png';
import OrganizationNewsImage3 from 'styles/assets/images/news/img_2.png';
import OrganizationNewsImage4 from 'styles/assets/images/news/img_3.png';
import OrganizationNewsImage5 from 'styles/assets/images/news/img_4.png';
import OrganizationNewsItem from 'components/organisms/OrganizationNewsItem';
import DisclosureItem from 'components/organisms/DisclosureItem';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';

const NewsList = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state;
  const { isSuccess, data, isError, error } = useReactQuery(
    type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? `notice-list` : `news-list`,
    type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? api.notice.list : api.news.list,
  );

  useEffect(() => {
    setOption({ title: '', subtitle: type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? '단체공시' : '단체소식', description: '', back: true, menu: true });
  }, [setOption, type]);

  const onClickHandler = (type, item) => {
    console.log('onClickHandler', type, item);
    navigate(`/news/${item._id}`, { state: { type } });
  };

  const onSearchResultData = data => {
    console.log('onSearchResultData', data);
  };

  return (
    <div className="campaign-list-wrapper">
      <div className="campaign-list-search-bar-wrapper">
        <ActSearchBar type={type === ORGANIZATION_NEWS_TYPE.NEWS ? SEARCH_TYPE.NEWS : SEARCH_TYPE.DISCLOSURE} searchResultData={onSearchResultData} />
      </div>
      <div className="left-24 divider-thick-primary-2" />
      {isSuccess &&
        data?.map((item, index) => {
          return (
            <div key={index}>
              {type === ORGANIZATION_NEWS_TYPE.NEWS ? (
                <OrganizationNewsItem item={item} clickHandler={item => onClickHandler(ORGANIZATION_NEWS_TYPE.NEWS, item)} />
              ) : (
                <DisclosureItem key={index} item={item} clickHandler={item => onClickHandler(ORGANIZATION_NEWS_TYPE.DISCLOSURE, item)} />
              )}
              <div className="divider" />
            </div>
          );
        })}
    </div>
  );
};

export default NewsList;
