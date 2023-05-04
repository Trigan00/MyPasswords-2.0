import { useTypedDispatch } from '../store/hooks/useTypedDispatch';
import { AlertColor } from '@mui/material';
import { setAlert } from '../store/slices/alertSlice';
import { useCallback } from 'react';

const useAlert = () => {
  const dispatch = useTypedDispatch();

  const showAlert = useCallback(
    (severity: AlertColor, message: string, duration: number = 6000) => {
      return dispatch(
        setAlert({
          severity,
          message,
          duration,
        }),
      );
    },
    [dispatch],
  );
  return showAlert;
};

export default useAlert;
