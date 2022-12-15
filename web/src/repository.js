export const api = {
  auth: {
    login: '/auth/user/login',
    register: '/auth/user/register',
    findPassword: '',
    logout: '',
  },
  my: {
    info: '',
    update: '',
    paymentHistory: '/api/v1/order/my',
    donationHistory: '/api/v1/donation/my',
  },
  organization: {
    list: '/api/v1/org',
    detail: id => `/api/v1/org/${id}`,
  },
  campaign: {
    list: '/api/v1/campaign',
    detail: id => `/api/v1/campaign/${id}`,
    listByOrg: org => `/api/v1/campaign/list-by-org/${org}`,
  },
  faq: {
    list: '/api/v1/faq',
  },
  main: {
    banner: '/api/v1/banner',
    org: '/api/v1/org',
  },
  news: {
    list: '/api/v1/news',
    detail: id => `/api/v1/news/${id}`,
    listByOrg: org => `/api/v1/news/list-by-org/${org}`,
  },
  notice: {
    list: '/api/v1/notice',
    detail: id => `/api/v1/notice/${id}`,
    listByOrg: org => `/api/v1/notice/list-by-org/${org}`,
  },
  order: {
    make: '/api/v1/order',
    complete: '/api/v1/order/complete',
  },
};
