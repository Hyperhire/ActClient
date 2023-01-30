import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import fetchData from 'utils/fetchData';

import { authAtom } from 'state';

// common query
export const useReactQuery = (key, url, options) => {
  const auth = useRecoilValue(authAtom);
  const headers = { Authorization: auth.accessToken };
  return useQuery(key, () => fetchData({ url, headers }), options);
};
