import { useInfiniteQuery } from 'react-query';
import fetchData from 'utils/fetchData';

const getMoreItems = async ({ pageParam = 0, queryKey }) => {
  const LIMIT = 20;
  const value = queryKey[0];
  const url = queryKey[1];
  const _url = `${url}?keyword=${value}&limit=${LIMIT}&lastIndex=${pageParam * LIMIT}`;
  const response = await fetchData({ url: _url });
  return { result: response, nextPage: pageParam + 1 };
};

export const useReactInfiniteQuery = queryKey => {
  return useInfiniteQuery(queryKey, getMoreItems, {
    getNextPageParam: lastPage => {
      return lastPage.result.pagination.hasNext ? lastPage.nextPage : undefined;
    },
  });
};
