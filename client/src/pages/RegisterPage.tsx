import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { routes } from '../utils/routesConsts';
import useAlert from '../hooks/useAlert';
import { useHttp } from '../hooks/useHttp';
import Loader from '../UI/Loader';

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        MyPasswords
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const RegisterPage: React.FC = () => {
  const showAlert = useAlert();
  const { request, isLoading, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [qr, setQr] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    if (form.password !== form.confirmPassword)
      return showAlert('error', 'Пароли не совпадают');
    const res = await request('auth/registration', 'post', {
      email: form.email,
      password: form.password,
    });

    if (res) {
      setQr(res.data.QRCodeUrl);
      showAlert('success', res.data.message as string);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#e10655' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            autoFocus
            error={!!error?.email}
            helperText={error?.email}
            value={form.email}
            onChange={changeHandler}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            error={!!error?.password}
            helperText={error?.password}
            value={form.password}
            onChange={changeHandler}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm password'
            type='password'
            value={form.confirmPassword}
            error={form.password !== form.confirmPassword}
            helperText={
              form.password !== form.confirmPassword
                ? 'Пароли не совпадают'
                : ''
            }
            onChange={changeHandler}
          />
          {!isLoading ? (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          ) : (
            <Loader />
          )}
        </Box>

        <Grid container>
          {/* <Grid item xs>
              <Link href='#' variant='body2'>
              Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            <Link href={routes.LOGIN_ROUTE} variant='body2'>
              {'Already have an account? Sign in'}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {qr && <img src={qr} alt='qr' />}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default RegisterPage;
