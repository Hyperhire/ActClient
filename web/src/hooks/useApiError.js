import { useCallback } from 'react';
import Logger from 'utils/logger';
const useApiError = () => {
  const handleError = useCallback(error => {
    Logger.error(error);
  }, []);

  return { handleError };
};

export default useApiError;
