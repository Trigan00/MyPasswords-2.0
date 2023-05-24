import React, { useEffect, useState } from 'react';
import { AddPasswordDto } from '../services/Password.interface';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import {
  getErrorData,
  useAddPasswordMutation,
  useGeneratePasswordMutation,
} from '../services/PasswordService';
import Loader from '../UI/Loader';
import useAlert from '../hooks/useAlert';
import CreateIcon from '@mui/icons-material/Create';

const AddPassword: React.FC = () => {
  const [createPassword, { isLoading, error }] = useAddPasswordMutation();
  const [generatePassword, { error: genError }] = useGeneratePasswordMutation();
  const showAlert = useAlert();
  const [form, setForm] = useState<AddPasswordDto>({
    title: '',
    login: '',
    password: '',
    url: '',
  });
  const [isWebSite, setIsWebSite] = useState(false);

  const createHandler = async () => {
    const res = await createPassword(form);
    setForm({
      title: '',
      login: '',
      password: '',
      url: '',
    });
    if ('data' in res) showAlert('success', res.data.message);
  };

  const generatePasswordHandler = async () => {
    const res = await generatePassword(undefined);
    if ('data' in res) setForm({ ...form, password: res.data.password });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error || genError) {
      showAlert('error', getErrorData(error || genError, 'message'));
    }
  }, [error, showAlert, genError]);

  return (
    <Box
      sx={{
        p: 2,
        mb: 5,
        maxWidth: '300px',
        height: 'fit-content',
        borderRadius: 2,
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
      }}
    >
      <TextField
        variant='outlined'
        fullWidth
        name='title'
        size='small'
        label='Название'
        margin='normal'
        error={!!getErrorData(error, 'title')}
        helperText={getErrorData(error, 'title')}
        value={form.title}
        onChange={changeHandler}
      />
      <TextField
        variant='outlined'
        fullWidth
        name='login'
        size='small'
        label='Логин'
        margin='normal'
        error={!!getErrorData(error, 'login')}
        helperText={getErrorData(error, 'login')}
        value={form.login}
        onChange={changeHandler}
      />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          variant='outlined'
          fullWidth
          name='password'
          size='small'
          label='Пароль'
          margin='normal'
          error={!!getErrorData(error, 'password')}
          helperText={getErrorData(error, 'password')}
          value={form.password}
          onChange={changeHandler}
        />
        <CreateIcon
          sx={{ ml: 1, cursor: 'pointer', color: 'grey' }}
          onClick={generatePasswordHandler}
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={isWebSite}
            onChange={() => setIsWebSite((prev) => !prev)}
          />
        }
        label='Is website'
      />
      <TextField
        variant='outlined'
        fullWidth
        name='url'
        size='small'
        label='URL'
        margin='normal'
        disabled={!isWebSite}
        value={form.url}
        onChange={changeHandler}
      />

      {!isLoading ? (
        <Button
          variant='contained'
          sx={{ mt: 1 }}
          fullWidth
          onClick={createHandler}
        >
          ДОБАВИТЬ
        </Button>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default AddPassword;
