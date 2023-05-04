import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import {
  getErrorData,
  useGetAllPasswordsQuery,
} from '../services/PasswordService';
import Loader from '../UI/Loader';
import useAlert from '../hooks/useAlert';
import PasswordCard from './PasswordCard';

const PasswordsList: React.FC = () => {
  const { data, error, isLoading } = useGetAllPasswordsQuery(undefined);
  const showAlert = useAlert();

  useEffect(() => {
    if (error) {
      showAlert('error', getErrorData(error, 'message'));
    }
  }, [error, showAlert]);

  if (isLoading) return <Loader />;
  if (!data) return <h1>{getErrorData(error, 'message')}</h1>;

  return (
    <Box>
      {data.length ? (
        data.map((password, i) => (
          <PasswordCard key={password.id} password={password} index={i} />
        ))
      ) : (
        <h3>Password list is empty</h3>
      )}
    </Box>
  );
};

export default PasswordsList;
