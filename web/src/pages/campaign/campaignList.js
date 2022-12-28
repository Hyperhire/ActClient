import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignItem from 'components/organisms/CampaignItem';
import ActSearchBar from 'components/atoms/ActSearchBar';
import { SEARCH_TYPE } from 'constants/constant';
import { api } from 'repository';
import { useReactInfiniteQuery } from '../../hooks/useReactInfiniteQuery';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ActSpinner from '../../components/atoms/ActSpinner';
const CampaignList = ({ setOption }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const loadMoreRef = useRef();
  const { isSuccess, data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useReactInfiniteQuery([searchKeyword, api.campaign.list]);

  useEffect(() => {
    setOption({ title: '', subtitle: '진행중인 캠페인', description: '', back: true, menu: false });
  }, [setOption]);
  const navigate = useNavigate();

  const onClickHandler = item => {
    navigate(`/campaign/${item._id}`);
  };

  const onSearchResultData = data => {
    console.log('onSearchResultData', data);
    setSearchKeyword(data.search);
  };

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div className="campaign-list-wrapper">
      <div className="campaign-list-search-bar-wrapper">
        <ActSearchBar type={SEARCH_TYPE.CAMPAIGN} searchResultData={onSearchResultData} />
      </div>
      <div className="left-24 divider-thick-primary-2" />
      {isSuccess &&
        data?.pages?.map(page =>
          page?.result?.list?.map((item, index) => (
            <div key={index}>
              <CampaignItem item={item} clickHandler={onClickHandler} />
              <div className="divider" />
            </div>
          )),
        )}
      {isFetching && !isFetchingNextPage && <ActSpinner />}
      <div className="max-width height-2" ref={loadMoreRef} />
    </div>
  );
};

export default CampaignList;
