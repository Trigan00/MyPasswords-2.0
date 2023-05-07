import axios from 'axios';
import { LoginProps, LoginResponse } from './user.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, localStorageName } from '../../../http';

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
        `${API_URL}auth/login`,
        loginData,
        {
          withCredentials: true,
        },
      );

      if (status !== 201) throw new Error('Server Error!');
      localStorage.setItem(localStorageName, JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk<unknown, undefined>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { status } = await axios.post(
        `${API_URL}auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (status !== 200) throw new Error('Server Error!');
      localStorage.removeItem(localStorageName);
      return defaultState;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const checkAuth = createAsyncThunk<LoginResponse, undefined>(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.get<LoginResponse>(
        `${API_URL}auth/refresh`,
        {
          withCredentials: true,
        },
      );

      if (status !== 200) throw new Error('Server Error!');
      const secretKey = JSON.parse(
        localStorage.getItem(localStorageName) as string,
      ).secretKey;
      localStorage.setItem(
        localStorageName,
        JSON.stringify({ token: data.token, secretKey }), //некоректно
      );
      return { ...data, secretKey };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
