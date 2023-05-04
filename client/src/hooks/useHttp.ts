import axios from 'axios';
import { useCallback, useState } from 'react';
import useAlert from './useAlert';
import { API_URL } from '../http';

type methods = 'get' | 'post' | 'put' | 'delete';

export const useHttp = () => {
  const showAlert = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const request = useCallback(
    async (url: string, method: methods, body: any = {}, headers: any = {}) => {
      setIsLoading(true);
      try {
        const res = await axios({
          method,
          url: API_URL + url,
          data: body,
          headers,
          // withCredentials: true
        });
        setIsLoading(false);
        return res;
      } catch (error: any) {
        showAlert('error', error.response.data.message);
        setIsLoading(false);
        setError(error.response.data);
      }
    },
    [showAlert],
  );

  const clearError = () => setError(null);
  return {
    isLoading,
    request,
    error,
    clearError,
  };
};
