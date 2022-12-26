import 'styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import React from 'react';
import Routes from './Routes';
import useApiError from 'hooks/useApiError';
import { TokenProvider } from './utils/TokenContext';

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
      <TokenProvider>
        <Router>
          <Routes />
        </Router>
      </TokenProvider>
    </QueryClientProvider>
  );
}

export default App;
