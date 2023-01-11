import 'styles/main.scss';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import useApiError from 'hooks/useApiError';
import Routers from './Routers';
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
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </TokenProvider>
    </QueryClientProvider>
  );
}

export default App;
