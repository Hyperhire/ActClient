import { request } from 'utils/axiosClient';

const fetchData = async props => {
  const { url, headers } = props;
  console.log('fetchData', props);
  const result = await request({ url, headers });
  return result.data?.data;
};

export default fetchData;
