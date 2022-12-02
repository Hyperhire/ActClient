import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { api } from 'repository';
import { setItem, USER_INFO } from 'utils/sessionStorage';
import { useReactQuery } from 'hooks/useReactQuery';
import { authAtom } from 'state';

const useLogin = loginInfo => {
  const setAuth = useSetRecoilState(authAtom);
  const { data, isError, error, isSuccess, refetch } = useReactQuery(`login-${loginInfo.userName}`, `${api.membership.login}${loginInfo}`, { enabled: false });
  console.log('login', data);

  useEffect(() => {
    if (!isError) return;
    console.log('login error', error);
  }, [isError, error]);

  useEffect(() => {
    console.log('useLogin useEffect');
  }, [data, isError, error, isSuccess, refetch]);
  // const navigate = useNavigate();
  // const { membership } = api;
  // const router = useLocation().pathname;
  // const location = useLocation();
  // const prevPath = location.state?.prevPath;

  // useEffect(() => {
  //   if (!isError) return;
  //   alert('Failed Login', error);
  // }, [isError, error]);
  //
  // useEffect(() => {
  //   if (!loginInfo) return;
  //   refetch();
  // }, [loginInfo, refetch]);
  //
  // useEffect(() => {
  //   if (!isSuccess) return;
  //   if (!data) {
  //     navigate('/login/register');
  //   }
  //   if (data) {
  //     const { userName } = data;
  //     setItem(USER_INFO, {
  //       username: userName,
  //     });
  //
  //     if (router === `/login`) {
  //       if (prevPath) {
  //         navigate(prevPath);
  //       } else {
  //         navigate('/');
  //       }
  //     }
  //   }
  // }, [data, navigate, isSuccess, router, prevPath]);
  // const login = loginInfo => {
  //   console.log('login', loginInfo);
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       setItem(USER_INFO, {
  //         userName: loginInfo.userName,
  //       });
  //       setAuth(true);
  //       resolve(true);
  //     }, [1000]);
  //   });
  // };
};
export default useLogin;
