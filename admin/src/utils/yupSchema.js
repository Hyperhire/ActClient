import * as yup from 'yup';
export const loginYup = yup.object().shape({
  id: yup.string().required(''),
  password: yup.string().required(''),
  // .max(15, '비밀번호는 15자리 이하여야 합니다.')
  // .min(8, '비밀번호는 8자리 이상이어야 합니다.')
  // .matches(/^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/, '특수문자가 포함되어야 합니다.'),
});
