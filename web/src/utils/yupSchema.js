import * as yup from 'yup';

const signUpYup = {
  email: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  nickname: yup
    .string()
    .required('필수 입력값 입니다.')
    .max(12, '닉네임은 12자리 이하여야 합니다.')
    .min(4, '닉네임는 4자리 이상이어야 합니다.')
    .matches(/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/g, '닉네임은 한글과 영문만 사용가능합니다.'),
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
  agreement: yup.boolean().oneOf([true], ''),
  // terms: yup.boolean().oneOf([true], ''),
  // privacy: yup.boolean().oneOf([true], ''),
};

export const individualSignUpYup = yup.object().shape({ ...signUpYup, receiveReceipt: yup.boolean().required('영수증 발급여부를 선택해주세요.') });

export const organizationSignUpYup = yup.object().shape({
  ...signUpYup,
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
  password: yup
    .string()
    .required('')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
  passwordCheck: yup
    .string()
    .required('')
    .oneOf([yup.ref('password'), null], '동일한 비밀번호를 입력해주세요.'),
  gender: yup.string().required('성별을 선택해주세요'),
  name: yup.string().required('실명을 입력해주세요.'),
  birthday: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .required('생년월일을 입력해주세요'),
  mobile: yup
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
    is: donationType => donationType === 1,
    then: yup.number().required(''),
    otherwise: yup.number().notRequired(''),
  }),
});

// donation campaign
export const donationCampaignYup = yup.object().shape({
  donationType: yup.string().required(''),
  donationAmount: yup.number().required(''),
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
  search: yup.string().required(''),
});

//resign membership
export const resignMembershipYup = yup.object().shape({
  isConfirm: yup.boolean().oneOf([true], ''),
});
