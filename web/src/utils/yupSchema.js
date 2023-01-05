import * as yup from 'yup';
import { DONATION_PAYMENT_TYPE } from '../constants/constant';

export const individualSignUpYup = yup.object().shape({
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  duplicateEmail: yup.boolean().oneOf([false], ''),
  nickname: yup
    .string()
    .required('필수 입력값 입니다.')
    .max(12, '닉네임은 12자리 이하여야 합니다.')
    .min(4, '닉네임는 4자리 이상이어야 합니다.')
    .matches(/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/g, '닉네임은 한글과 영문만 사용가능합니다.'),
  duplicateNickname: yup.boolean().oneOf([false], ''),
  password: yup
    .string()
    .required('필수 입력값 입니다.')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
  passwordCheck: yup
    .string()
    .required('필수 입력값 입니다.')
    .oneOf([yup.ref('password'), null], '동일한 비밀번호를 입력해주세요.'),
  agreement: yup.boolean().oneOf([true], '약관에 동의해주세요'),
  receiveReceipt: yup.boolean().oneOf([true], '기부금 영수증 발급 동의가 필요합니다.'),
});
// export const individualSignUpYup = yup.object().shape({ ...signUpYup, receiveReceipt: yup.string().required('영수증 발급여부를 선택해주세요.') });

export const organizationSignUpYup = yup.object().shape({
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  duplicateEmail: yup.boolean().oneOf([false], ''),
  nickname: yup
    .string()
    .required('필수 입력값 입니다.')
    .max(12, '닉네임은 12자리 이하여야 합니다.')
    .min(4, '닉네임는 4자리 이상이어야 합니다.')
    .matches(/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/g, '닉네임은 한글과 영문만 사용가능합니다.'),
  duplicateNickname: yup.boolean().oneOf([false], ''),
  password: yup
    .string()
    .required('필수 입력값 입니다.')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
  passwordCheck: yup
    .string()
    .required('필수 입력값 입니다.')
    .oneOf([yup.ref('password'), null], '동일한 비밀번호를 입력해주세요.'),
  agreement: yup.boolean().oneOf([true], '약관에 동의해주세요'),
  organizationName: yup.string().required('필수 입력값 입니다.'),
  organizationLicenseNumber: yup.string().required('필수 입력값 입니다.'),
  managerName: yup.string().required('필수 입력값 입니다.'),
  managerMobile: yup.string().required('필수 입력값 입니다.'),
  website: yup.string(),
});

// profile update
export const profileUpdateYup = yup.object().shape({
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  nickname: yup.string().required('').max(12, '닉네임은 12자리 이하여야 합니다.').min(4, '닉네임는 4자리 이상이어야 합니다.'),
  duplicateNickname: yup.boolean().oneOf([false], ''),
  password: yup
    .string()
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
  passwordCheck: yup.string().oneOf([yup.ref('password'), null], '동일한 비밀번호를 입력해주세요.'),
  gender: yup.string().required('성별을 선택해주세요'),
  name: yup.string().required('실명을 입력해주세요.'),
  dateOfBirth: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('생년월일을 입력해주세요'),
  mobile: yup
    .string()
    .required('')
    .matches(/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/, 'Phone number is not valid'),
});
export const profileUpdateOrgYup = yup.object().shape({
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  nickname: yup.string().required('').max(12, '닉네임은 12자리 이하여야 합니다.').min(4, '닉네임는 4자리 이상이어야 합니다.'),
  duplicateNickname: yup.boolean().oneOf([false], ''),
  password: yup
    .string()
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
  passwordCheck: yup.string().oneOf([yup.ref('password'), null], '동일한 비밀번호를 입력해주세요.'),

  managerName: yup.string().required('담당자 이름을 입력해주세요.'),
  homepageUrl: yup.string().required('홈페이지 URL을 입력해주세요.'),
  managerMobile: yup
    .string()
    .required('')
    .matches(/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/, 'Phone number is not valid'),
});
// login
export const loginYup = yup.object().shape({
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  password: yup
    .string()
    .required('')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
  isSaveAccount: yup.boolean(),
});

// find password
export const findPasswordYup = yup.object().shape({
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
});

// donation organization
export const donationOrganizationYup = yup.object().shape({
  donationType: yup.string().required(''),
  donationAmount: yup.number().required(''),
  donationDate: yup.number().when('donationType', {
    is: donationType => donationType === DONATION_PAYMENT_TYPE.SUBSCRIPTION,
    then: yup.number().required(''),
    otherwise: yup.number().notRequired(''),
  }),
  pg: yup.string().required(''),
});

// donation campaign
export const donationCampaignYup = yup.object().shape({
  donationType: yup.string().required(''),
  donationAmount: yup.number().required(''),
  pg: yup.string().required(''),
});

// donation campaign
export const donationPaymentYup = yup.object().shape({
  cardNumber: yup.string().required('').min(14, '').max(16, ''),
  cardValidDate: yup.string().required('').length(4, ''),
  cardBirthday: yup.string().required('').length(6, ''),
  cardPassword: yup.string().required('').length(2, ''),
  cardCVV: yup.string().required('').length(3, ''),
  isSaveCardInformation: yup.boolean(),
});
// search
export const searchYup = yup.object().shape({
  search: yup.string(),
});

//resign membership
export const resignMembershipYup = yup.object().shape({
  isConfirm: yup.boolean().oneOf([true], ''),
});

//verify
export const verifyYup = yup.object().shape({
  verify0: yup.string().required(''),
  verify1: yup.string().required(''),
  verify2: yup.string().required(''),
  verify3: yup.string().required(''),
  verify4: yup.string().required(''),
  verify5: yup.string().required(''),
});

export const orgInformationYup = yup.object().shape({
  shortDescription: yup.string(),
  description: yup.string(),
});

export const newsPostYup = yup.object().shape({
  title: yup.string().required(''),
  description: yup.string().required(''),
  newsImages: yup.array().min(1),
});

export const campaignPostYup = yup.object().shape({
  title: yup.string().required(''),
  description: yup.string().required(''),
  campaignImages: yup.array().min(1),
  startedAt: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required(''),
  endedAt: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required(''),
  goal: yup.string().required(''),
});
