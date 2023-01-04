import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ActSearchBar from 'components/atoms/ActSearchBar';
import { MEMBER_TYPE, ORGANIZATION_NEWS_TYPE, SEARCH_TYPE } from 'constants/constant';
import OrganizationNewsItem from 'components/organisms/OrganizationNewsItem';
import DisclosureItem from 'components/organisms/DisclosureItem';
import { api } from '../../repository';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useReactInfiniteQuery } from '../../hooks/useReactInfiniteQuery';
import ActSpinner from '../../components/atoms/ActSpinner';
import ActButton from '../../components/atoms/ActButton';
import { usersAtom } from '../../state';

const NewsList = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state;
  const [searchKeyword, setSearchKeyword] = useState('');
  const loadMoreRef = useRef();
  const user = useRecoilValue(usersAtom);
  console.log('type', type);
  const { isSuccess, data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useReactInfiniteQuery([
    searchKeyword,
    type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? api.notice.list : api.news.list,
  ]);

  useEffect(() => {
    setOption({ title: '', subtitle: type === ORGANIZATION_NEWS_TYPE.DISCLOSURE ? '단체공시' : '단체소식', description: '', back: true, menu: true });
  }, [setOption, type]);

  const onClickHandler = (type, item) => {
    navigate(`/news/${item._id}`, { state: { type } });
  };

  const onSearchResultData = data => {
    setSearchKeyword(data.search);
  };

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const onHandlePost = () => {
    navigate('/news/post', { state: { type } });
  };

  return (
    <div className="campaign-list-wrapper">
      {user?.userType === MEMBER_TYPE.INDIVIDUAL ? (
        <div className="campaign-list-search-bar-wrapper">
          <ActSearchBar type={type === ORGANIZATION_NEWS_TYPE.NEWS ? SEARCH_TYPE.NEWS : SEARCH_TYPE.DISCLOSURE} searchResultData={onSearchResultData} />
        </div>
      ) : (
        <div className="padding-top-24" />
      )}
      <div className="left-24 divider-thick-primary-2" />
      {isSuccess &&
        data?.pages?.map(page =>
          page?.result?.list?.map((item, index) => (
            <div key={index}>
              {type === ORGANIZATION_NEWS_TYPE.NEWS ? (
                <OrganizationNewsItem item={item} clickHandler={item => onClickHandler(ORGANIZATION_NEWS_TYPE.NEWS, item)} />
              ) : (
                <DisclosureItem key={index} item={item} clickHandler={item => onClickHandler(ORGANIZATION_NEWS_TYPE.DISCLOSURE, item)} />
              )}
              <div className="divider" />
            </div>
          )),
        )}
      {isFetching && !isFetchingNextPage && <ActSpinner />}
      <div className="max-width height-2" ref={loadMoreRef} />
      {data?.pages[0].result.list.length <= 0 && (
        <div className="campaign-list-no-data-wrapper">
          <div className="campaign-list-no-data">등록 된 단체 소식이 없습니다.</div>
        </div>
      )}
      <div className="campaign-list-button-wrapper">
        {user?.userType === MEMBER_TYPE.ORGANIZATION && (
          <div className="max-width">
            <ActButton className="primary-button-x-large" label={type === ORGANIZATION_NEWS_TYPE.NEWS ? '단체 소식 등록' : '단체 공시 등록'} handleOnClick={onHandlePost} radius={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
