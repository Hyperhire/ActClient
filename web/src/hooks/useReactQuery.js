import { useQuery } from 'react-query';
import fetchData from 'utils/fetchData';

// common query
export const useReactQuery = (key, url, options) => {
  return useQuery(key, () => fetchData(url), options);
};
