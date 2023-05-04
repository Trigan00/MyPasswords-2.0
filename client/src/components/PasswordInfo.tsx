import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getErrorData,
  useDecryptPasswordQuery,
  useGeneratePasswordMutation,
  useUpdatePasswordMutation,
} from '../services/PasswordService';
import Loader from '../UI/Loader';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import useAlert from '../hooks/useAlert';

interface PasswordInfoProps {
  id: number;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const PasswordInfo: React.FC<PasswordInfoProps> = ({
  id,
  isModal,
  setIsModal,
}) => {
  const { data, isLoading, error, refetch } = useDecryptPasswordQuery(id);
  const [updatePassword, { isLoading: updateLoading, error: updateError }] =
    useUpdatePasswordMutation();
  const [generatePassword] = useGeneratePasswordMutation();

  const showAlert = useAlert();

  const [form, setForm] = useState({
    title: '',
    login: '',
    password: '',
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  useEffect(() => {
    if (error || updateError) {
      showAlert('error', getErrorData(error || updateError, 'message'));
    }
  }, [error, showAlert, updateError]);

  const saveHandler = async () => {
    const res = await updatePassword({ ...form, id });
    await refetch();
    if ('data' in res) showAlert('success', res.data.message);
  };

  const generatePasswordHandler = async () => {
    const res = await generatePassword(undefined);
    if ('data' in res) setForm({ ...form, password: res.data.password });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyHandler = (
    type: 'title' | 'login' | 'password',
    message: string,
  ) => {
    copy(form[type]);
    showAlert('info', message, 1500);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isModal}
      onClose={() => setIsModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModal}>
        <Box sx={style}>
          {!isLoading ? (
            <Box sx={{ maxWidth: '500px', width: '80vw' }}>
              <Typography
                id='transition-modal-title'
                variant='h5'
                component='h2'
                sx={{ textAlign: 'center' }}
              >
                {data?.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  margin='normal'
                  size='small'
                  label='Название'
                  variant='filled'
                  name='title'
                  fullWidth
                  error={!!getErrorData(updateError, 'title')}
                  helperText={getErrorData(updateError, 'title')}
                  value={form.title}
                  onChange={changeHandler}
                />
                <ContentCopyIcon
                  sx={{ ml: 2, color: 'grey', cursor: 'pointer' }}
                  onClick={() => copyHandler('title', 'Название скопировано')}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  margin='normal'
                  size='small'
                  label='Логин'
                  variant='filled'
                  name='login'
                  fullWidth
                  error={!!getErrorData(updateError, 'login')}
                  helperText={getErrorData(updateError, 'login')}
                  value={form.login}
                  onChange={changeHandler}
                />
                <ContentCopyIcon
                  sx={{ ml: 2, color: 'grey', cursor: 'pointer' }}
                  onClick={() => copyHandler('login', 'Логин скопирован')}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  margin='normal'
                  size='small'
                  label='Пароль'
                  variant='filled'
                  name='password'
                  fullWidth
                  error={!!getErrorData(updateError, 'password')}
                  helperText={getErrorData(updateError, 'password')}
                  value={form.password}
                  onChange={changeHandler}
                />
                <ContentCopyIcon
                  sx={{ ml: 2, color: 'grey', cursor: 'pointer' }}
                  onClick={() => copyHandler('password', 'Пароль скопирован')}
                />
              </Box>
              <Box
                fontSize={14}
                color={'#1976d2'}
                sx={{ cursor: 'pointer' }}
                onClick={generatePasswordHandler}
              >
                Сгенерировать пароль
              </Box>
              {!updateLoading ? (
                <Box sx={{ mt: 3, float: 'right' }}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => saveHandler()}
                  >
                    Сохранить
                  </Button>
                  <Button
                    size='small'
                    sx={{ ml: 1 }}
                    onClick={() => setIsModal(false)}
                  >
                    Закрыть
                  </Button>
                </Box>
              ) : (
                <Loader />
              )}
            </Box>
          ) : (
            <Loader />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default PasswordInfo;
