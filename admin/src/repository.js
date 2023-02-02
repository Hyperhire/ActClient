export const api = {
  auth: {
    register: '/api/admin/v1/auth/register',
    login: '/api/admin/v1/auth/login',
    reIssueToken: '/api/admin/v1/auth/reissue-token',
  },
  user: {
    list: '/api/admin/v1/user',
    detail: id => `/api/admin/v1/user/${id}`,
    patch: id => `/api/admin/v1/user/${id}`,
    delete: id => `/api/admin/v1/user/${id}`,
  },
  organization: {
    list: '/api/admin/v1/org',
    detail: id => `/api/admin/v1/org/${id}`,
    patch: id => `/api/admin/v1/org/${id}`,
    delete: id => `/api/admin/v1/org/${id}`,
  },
  notice: {
    list: '/api/admin/v1/notice',
    detail: id => `/api/admin/v1/notice/${id}`,
    patch: id => `/api/admin/v1/notice/${id}`,
    delete: id => `/api/admin/v1/notice/${id}`,
  },
  news: {
    list: '/api/admin/v1/news',
    detail: id => `/api/admin/v1/news/${id}`,
    patch: id => `/api/admin/v1/news/${id}`,
    delete: id => `/api/admin/v1/news/${id}`,
  },
  campaign: {
    list: '/api/admin/v1/campaign',
    detail: id => `/api/admin/v1/campaign/${id}`,
    patch: id => `/api/admin/v1/campaign/${id}`,
    delete: id => `/api/admin/v1/campaign/${id}`,
  },
  order: {
    list: '/api/admin/v1/order',
    detail: id => `/api/admin/v1/order/${id}`,
    patch: id => `/api/admin/v1/order/${id}`,
  },
  withdraw: {
    list: '/api/admin/v1/withdraw',
    detail: id => `/api/admin/v1/withdraw/${id}`,
    patch: id => `/api/admin/v1/withdraw/${id}`,
  },
  donationOrg: {
    list: '/api/admin/v1/donation/org',
    detail: id => `/api/admin/v1/donation/org/${id}`,
    patch: id => `/api/admin/v1/donation/${id}`,
  },
  donationCampaign: {
    list: '/api/admin/v1/donation/campaign',
    detail: id => `/api/admin/v1/donation/campaign/${id}`,
    patch: id => `/api/admin/v1/donation/${id}`,
  },
  faq: {
    post: '/api/admin/v1/faq',
    list: '/api/admin/v1/faq',
    detail: id => `/api/admin/v1/faq/${id}`,
    patch: id => `/api/admin/v1/faq/${id}`,
    delete: id => `/api/admin/v1/faq/${id}`,
  },
  banner: {
    list: '/api/admin/v1/banner',
    detail: id => `/api/admin/v1/banner${id}`,
    patch: id => `/api/admin/v1/banner/${id}`,
    delete: id => `/api/admin/v1/banner/${id}`,
  },
};
