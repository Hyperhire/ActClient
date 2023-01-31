import 'styles/main.scss';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import useApiError from 'hooks/useApiError';
import Routers from './Routers';
import { TokenProvider } from './utils/TokenContext';
import ActModal from './components/atoms/ActModal';

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
        <BrowserRouter>
          <ActModal />
          <Routers />
        </BrowserRouter>
      </TokenProvider>
    </QueryClientProvider>
  );
}

export default App;
