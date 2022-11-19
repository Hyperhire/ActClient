import 'styles/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Routes from './Routes';
import useApiError from 'hooks/useApiError';
import Faq from './pages/faq';
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
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
