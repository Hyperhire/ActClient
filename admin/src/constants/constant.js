export const MEMBER_TYPE = {
  INDIVIDUAL: 'individual',
  ORGANIZATION: 'organization',
};

export const MEMBER_MENU = [
  {
    label: '일반회원',
    value: MEMBER_TYPE.INDIVIDUAL,
  },
  { label: '단체회원', value: MEMBER_TYPE.ORGANIZATION },
];

export const ORGANIZATION_MENU_TYPE = {
  NEWS: 'news',
  NOTICE: 'notice',
  CAMPAIGN: 'campaign',
};

export const ORGANIZATION_MENU = [
  {
    label: '공시관리',
    value: 'notice',
  },
  { label: '소식관리', value: 'news' },
  { label: '캠페인관리', value: 'campaign' },
];

export const PAYMENT_MENU_TYPE = {
  PAYMENT: 'payment',
  SETTLEMENT: 'settlement',
};

export const PAYMENT_MENU = [
  {
    label: '결제관리',
    value: PAYMENT_MENU_TYPE.PAYMENT,
  },
  { label: '정산관리', value: PAYMENT_MENU_TYPE.SETTLEMENT },
];

export const DONATION_MENU_TYPE = {
  ORG: 'org',
  CAMPAIGN: 'campaign',
};

export const DONATION_MENU = [
  {
    label: '단체후원',
    value: DONATION_MENU_TYPE.ORG,
  },
  { label: '캠페인후원', value: DONATION_MENU_TYPE.CAMPAIGN },
];

export const OPERATION_MENU_TYPE = {
  FAQ: 'faq',
  BANNER: 'banner',
};

export const OPERATION_MENU = [
  {
    label: 'FAQ',
    value: OPERATION_MENU_TYPE.FAQ,
  },
  { label: '배너관리', value: OPERATION_MENU_TYPE.BANNER },
];

export const GENDER = [
  {
    value: 'male',
    label: '남',
  },
  {
    value: 'female',
    label: '여',
  },
];

export const DONATION_STATUS_VALUE = {
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SINGLE: 'single',
};

export const DONATION_STATUS = [
  {
    value: DONATION_STATUS_VALUE.ALL,
    label: '후원상태',
  },
  {
    value: DONATION_STATUS_VALUE.ACTIVE,
    label: '정기후원(진행중)',
  },
  {
    value: DONATION_STATUS_VALUE.INACTIVE,
    label: '정기후원(종료)',
  },
  {
    value: DONATION_STATUS_VALUE.SINGLE,
    label: '일시후원',
  },
];

export const DONATION_TYPE = {
  ORGANIZATION: 'ORG',
  CAMPAIGN: 'CAMPAIGN',
};

export const PAYMENT_PG_TYPE = {
  KAKAO: 'KAKAO',
  NAVER: 'NAVER',
};

export const DONATION_PAYMENT_TYPE = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  SINGLE: 'SINGLE',
};

export const DONATION_HISTORY_TYPE = {
  ORGANIZATION: 'organization',
  CAMPAIGN: 'campaign',
};

export const ORGANIZATION_NEWS_TYPE = {
  NEWS: 'news',
  DISCLOSURE: 'disclosure',
};

export const ORGANIZATION_ID = {
  HOLT: 'holt',
  WORLD_VISION: 'world-vision',
  WE_BRIDGE: 'we-bridge',
  KSFP: 'ksfp',
  GOOD_NEIGHBORS: 'good-neighbors',
};

export const MODAL_TYPES = {
  CONFIRM_MODAL: 'conform-modal',
  ALERT_MODAL: 'alert-modal',
};
export const SEARCH_TYPE = {
  CAMPAIGN: 'campaign',
  NEWS: 'new',
  DISCLOSURE: 'disclosure',
  FAQ: 'faq',
};

export const COOKIES = {
  REFRESH_TOKEN: 'refresh-token',
};
