import 'styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import useApiError from 'hooks/useApiError';

window.onload = function () {
  localStorage.clear();
};
const { handleError } = useApiError;
const queryClient = new QueryClient({
  defaultOptions: {
    onError: handleError,
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
