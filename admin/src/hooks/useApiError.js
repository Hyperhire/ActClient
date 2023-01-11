import { useCallback } from 'react';

const useApiError = () => {
  const handleError = useCallback(error => {
    console.log(error);
  }, []);

  return { handleError };
};

export default useApiError;
