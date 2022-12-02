import 'styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Routes from './Routes';
import useApiError from 'hooks/useApiError';
import { isFirstLoad } from 'state';
import Splash from 'components/organisms/Splash';

window.onload = function () {
  localStorage.clear();
};
const { handleError } = useApiError;
const queryClient = new QueryClient({
  defaultOptions: {
    onError: handleError,
  },
});

function App() {
  const setFirstLoad = useSetRecoilState(isFirstLoad);
  const firstLoad = useRecoilValue(isFirstLoad);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoad(false);
    }, 2000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Splash firstLoad={firstLoad} />
      <Router>
        <Routes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
