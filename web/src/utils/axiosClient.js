import axios from 'axios';

const { REACT_APP_BASE_URL, REACT_APP_KAKAO_PAYMENT_URL } = process.env;

const client = axios.create({ baseURL: REACT_APP_BASE_URL });
const kakaoClient = axios.create({ baseURL: REACT_APP_KAKAO_PAYMENT_URL });

const onRequest = config => {
  const { headers, method, url, data } = config;
  console.log('axios ======================>', headers, method, url, data ?? '');
  return config;
};

const onResponseSuccess = response => {
  const { url } = response.config;
  const { status } = response;
  console.log('axios <======================', status, url, response.data);
  return response;
};

const onResponseRejected = error => {
  console.log('axios error', error.config?.url, error, error.response?.data ?? '');
  if (error.config) {
    return Promise.reject(error);
  }
};
client.interceptors.request.use(onRequest);
client.interceptors.response.use(onResponseSuccess, onResponseRejected);

kakaoClient.interceptors.request.use(onRequest);
kakaoClient.interceptors.response.use(onResponseSuccess, onResponseRejected);

export const request = ({ ...options }) => {
  const onSuccess = response => response;
  const onError = error => error;
  return client(options).then(onSuccess).catch(onError);
};

export const setAuthorization = token => {
  client.defaults.headers.common.Authorization = token;
};
