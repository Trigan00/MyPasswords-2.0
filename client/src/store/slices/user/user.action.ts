import axios from 'axios';
import { LoginProps, LoginResponse } from './user.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { localStorageName } from '../../../http';

export const defaultState = {
  email: '',
  id: '',
  token: '',
  isLoading: false,
  secretKey: '',
  error: null,
};

export const login = createAsyncThunk<LoginResponse, LoginProps>(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_SERVERURL}/api/auth/login`,
        loginData,
      );

      if (status !== 201) throw new Error('Server Error!');
      localStorage.setItem(localStorageName, JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
