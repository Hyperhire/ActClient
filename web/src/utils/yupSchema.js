import * as yup from 'yup';

export const signUpYup = yup.object().shape({
  userId: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  userNickName: yup.string().required('').max(12, '닉네임은 12자리 이하여야 합니다.').min(4, '닉네임는 4자리 이상이어야 합니다.'),
  userPassword: yup
    .string()
    .required('')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, '특수문자가 포함되어야 합니다.'),
  userPasswordCheck: yup
    .string()
    .required('')
    .oneOf([yup.ref('userPassword'), null], '동일한 비밀번호를 입력해주세요.'),
  agreement: yup.boolean().oneOf([true], ''),
});

// profile update
export const profileUpdateYup = yup.object().shape({
  userId: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  userNickName: yup.string().required('').max(12, '닉네임은 12자리 이하여야 합니다.').min(4, '닉네임는 4자리 이상이어야 합니다.'),
  userPassword: yup
    .string()
    .required('')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, '특수문자가 포함되어야 합니다.'),
  userPasswordCheck: yup
    .string()
    .required('')
    .oneOf([yup.ref('userPassword'), null], '동일한 비밀번호를 입력해주세요.'),
  userGender: yup.string().required('성별을 선택해주세요'),
  userName: yup.string().required('실명을 입력해주세요.'),
  userBirthday: yup.date().required('생년월일을 입력해주세요'),
  userMobile: yup
    .string()
    .required('')
    .matches(/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/, 'Phone number is not valid'),
});

// login
export const loginYup = yup.object().shape({
  userId: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
  userPassword: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .max(15, '비밀번호는 15자리 이하여야 합니다.')
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/, '특수문자가 포함되어야 합니다.'),
  isSave: yup.boolean(),
});

// find password
export const findPasswordYup = yup.object().shape({
  userId: yup.string().required('').email('! 이메일 형식이 올바르지 않습니다.'),
});
