import { request } from 'utils/axiosClient';

const fetchData = async url => {
  const result = await request({ url });
  return result.data?.data;
};

export default fetchData;
