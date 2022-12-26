import { useInfiniteQuery } from 'react-query';
import fetchData from 'utils/fetchData';
const getMoreItems = async ({ pageParam = 0, queryKey }) => {
  const LIMIT = 20;
  const value = queryKey[0];
  const url = queryKey[1];
  const _url = `${url}?keyword=${value}&limit=${LIMIT}&lastIndex=${pageParam.lastIndex ?? 0}`;
  const response = await fetchData({ url: _url });
  return { result: response, pagination: response.pagination };
};

export const useReactInfiniteQuery = queryKey => {
  const res = useInfiniteQuery(queryKey, getMoreItems, {
    getNextPageParam: pagination => {
      return pagination.hasNext ? pagination : undefined;
    },
  });
  return res;
};
