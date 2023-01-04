export const MEMBER_TYPE = {
  INDIVIDUAL: 'individual',
  ORGANIZATION: 'organization',
};

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
