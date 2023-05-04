import React, { useEffect, useState } from 'react';
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
import { login } from '../store/slices/user/user.action';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { useTypedDispatch } from '../store/hooks/useTypedDispatch';
import Loader from '../UI/Loader';
import useAlert from '../hooks/useAlert';

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

const LoginPage: React.FC = () => {
  const { isLoading, error } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();
  const showAlert = useAlert();
  const [form, setForm] = useState({
    email: '',
    password: '',
    code: '',
  });

  useEffect(() => {
    if (error) showAlert('error', error.message);
  }, [error, showAlert]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      login({ email: form.email, password: form.password, code: form.code }),
    );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
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
            id='password'
            autoComplete='current-password'
            error={!!error?.password}
            helperText={error?.password}
            value={form.password}
            onChange={changeHandler}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='code'
            label='Code'
            type='number'
            id='code'
            value={form.code}
            onChange={changeHandler}
          />
          {!isLoading ? (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          ) : (
            <Loader />
          )}
          <Grid container>
            {/* <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href={routes.REGISTRATION_ROUTE} variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
