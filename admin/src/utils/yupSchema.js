import * as yup from 'yup';
export const loginYup = yup.object().shape({
  id: yup.string().required(''),
  password: yup.string().required(''),
});

export const bannerYup = yup.object().shape({
  url: yup.string().required(''),
  image: yup.string().required(''),
  visible: yup.boolean().required(''),
});

export const faqYup = yup.object().shape({
  question: yup.string().required(''),
  answer: yup.string().required(''),
});
