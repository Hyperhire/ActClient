import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { api } from 'repository';
import { setItem, USER_INFO } from 'utils/sessionStorage';
import { useReactQuery } from 'hooks/useReactQuery';
import { authAtom } from 'state';

const useLogin = () => {
  const setAuth = useSetRecoilState(authAtom);

  // const navigate = useNavigate();
  // const { membership } = api;
  // const router = useLocation().pathname;
  // const location = useLocation();
  // const prevPath = location.state?.prevPath;
  // const { data, isError, error, isSuccess, refetch } = useReactQuery(`login-${loginInfo.userName}`, `${membership.login}${loginInfo}`, { enabled: false });

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
  const login = loginInfo => {
    console.log('login', loginInfo);
    return new Promise(resolve => {
      setTimeout(() => {
        setItem(USER_INFO, {
          userName: loginInfo.userName,
        });
        setAuth(true);
        resolve(true);
      }, [1000]);
    });
  };
  const logout = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        setAuth(false);
        resolve(true);
      }, [1000]);
    });
  };
  return { login, logout };
};
export default useLogin;
