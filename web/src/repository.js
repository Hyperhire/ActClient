import SettlementHistory from './pages/org/settlementHistory';

export const api = {
  auth: {
    login: '/api/v1/auth/login',
    registerInd: '/api/v1/auth/user/register',
    registerIndSocial: '/api/v1/auth/user/register/social',
    registerOrg: '/api/v1/auth/org/register',
    registerOrgSocial: '/api/v1/auth/org/register/social',
    forgotPassword: '/api/v1/auth/forgot-password',
    verifyEmail: '/api/v1/auth/verify-email',
    reSendVerification: '/api/v1/auth/resend-verification-email',
    logout: '',
    my: 'api/v1/auth/my',
    duplicateEmail: email => `/api/v1/auth/check-duplicate-email?email=${email}`,
    duplicateNickname: nickname => `/api/v1/auth/check-duplicate-nickname?nickname=${nickname}`,
    reIssueToken: '/api/v1/auth/reissue-token',
    editProfile: '/api/v1/auth/edit-profile',
    editOrgProfile: '/api/v1/org/edit-my-org-detail',
    getKakaoCode: 'api/v1/auth/kakao/code',
    socialLogin: loginType => `/api/v1/auth/login/social/${loginType}`,
  },
  my: {
    update: '',
    paymentHistory: '/api/v1/order/my',
    donationHistory: '/api/v1/donation/my',
    nftDetail: id => `/api/v1/nft?token_id=${id}`,
    settlementPre: '/api/v1/withdraw/pre-request-list',
    settlementPost: '/api/v1/withdraw/post-request-list',
    settlementWithdraw: '/api/v1/withdraw',
  },
  organization: {
    list: '/api/v1/org',
    detail: id => `/api/v1/org/${id}`,
  },
  campaign: {
    post: '/api/v1/campaign',
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
    post: '/api/v1/news',
    list: '/api/v1/news',
    detail: id => `/api/v1/news/${id}`,
    listByOrg: org => `/api/v1/news/list-by-org/${org}`,
  },
  notice: {
    post: '/api/v1/notice',
    list: '/api/v1/notice',
    detail: id => `/api/v1/notice/${id}`,
    listByOrg: org => `/api/v1/notice/list-by-org/${org}`,
  },
  order: {
    make: '/api/v1/order',
    complete: '/api/v1/order/complete',
    canceled: '/api/v1/order/canceled',
    failed: '/api/v1/order/failed',
    unsubscribe: '/api/v1/subscription/inactive',
  },
  utils: {
    uploadImage: '/api/v1/utils/upload-image',
  },
};
