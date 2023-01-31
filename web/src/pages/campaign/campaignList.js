import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import CampaignItem from 'components/organisms/CampaignItem';
import ActSearchBar from 'components/atoms/ActSearchBar';
import { MEMBER_TYPE, ORGANIZATION_NEWS_TYPE, SEARCH_TYPE } from 'constants/constant';
import { api } from 'repository';
import { useReactInfiniteQuery } from '../../hooks/useReactInfiniteQuery';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ActSpinner from '../../components/atoms/ActSpinner';
import { usersAtom } from '../../state';
import ActButton from '../../components/atoms/ActButton';
const CampaignList = ({ setOption }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const loadMoreRef = useRef();
  const { isSuccess, data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useReactInfiniteQuery([searchKeyword, api.campaign.list]);
  const user = useRecoilValue(usersAtom);
  useEffect(() => {
    setOption({ title: '', subtitle: user?.userType === MEMBER_TYPE.INDIVIDUAL ? '진행중인 캠페인' : '진행중인 단체 캠페인', description: '', back: true, menu: true });
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

  const onHandlePost = () => {
    navigate('post');
  };

  console.log('data', data);
  return (
    <div className="campaign-list-wrapper">
      {user?.userType === MEMBER_TYPE.INDIVIDUAL ? (
        <div className="campaign-list-search-bar-wrapper">
          <ActSearchBar type={SEARCH_TYPE.CAMPAIGN} searchResultData={onSearchResultData} />
        </div>
      ) : (
        <div className="padding-top-24" />
      )}
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
      {data?.pages[0].result.list.length <= 0 && (
        <div className="campaign-list-no-data-wrapper">
          <div className="campaign-list-no-data">등록 된 단체 캠페인이 없습니다.</div>
        </div>
      )}
      {user?.userType === MEMBER_TYPE.ORGANIZATION && <ActButton className="primary-button-x-large" label="단체 캠페인 등록" handleOnClick={onHandlePost} radius={0} />}
    </div>
  );
};

export default CampaignList;
