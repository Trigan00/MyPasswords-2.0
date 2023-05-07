import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../store';
import {
  AddPasswordDto,
  IDecryptedPassword,
  IEncryptedPassword,
  IGeneratedPassword,
  UpdatePasswordDto,
} from './Password.interface';

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { API_URL, localStorageName } from '../http';
import axios from 'axios';
import { updateToken } from '../store/slices/user/userSlice';
import { LoginResponse } from '../store/slices/user/user.interface';

export const getErrorData = (
  error: FetchBaseQueryError | SerializedError | undefined,
  prop: string,
) => {
  if (error && 'message' in error) {
    if (error.message === 'Request failed with status code 401')
      return 'Нет авторизации';
  }
  if (error && 'status' in error) {
    const data = JSON.stringify(error.data);
    return JSON.parse(data)[prop];
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    // const storage = JSON.parse(
    //   localStorage.getItem(localStorageName) as string,
    // );
    const secretKey = (getState() as RootState).user.secretKey;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (secretKey) {
      headers.set('secretKey', secretKey);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const response = await axios.get<LoginResponse>(`${API_URL}auth/refresh`, {
      withCredentials: true,
    });
    const secretKey = (api.getState() as RootState).user.secretKey;
    localStorage.setItem(
      localStorageName,
      JSON.stringify({ ...response.data, secretKey }),
    );
    if (response.data) {
      // store the new token
      api.dispatch(updateToken(response.data.token));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log(result.error);
      // api.dispatch(loggedOut())
    }
  }
  return result;
};

export const passwordAPI = createApi({
  reducerPath: 'passwordAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Password'],
  endpoints: (build) => ({
    getAllPasswords: build.query<IEncryptedPassword[], undefined>({
      query: () => ({
        url: `passwords/allPasswords`,
        method: 'GET',
      }),
      providesTags: (result) => ['Password'],
    }),
    decryptPassword: build.query<IDecryptedPassword, number>({
      query: (id) => ({
        url: `passwords/decrypt/${id}`,
        method: 'GET',
      }),
    }),
    addPassword: build.mutation<{ message: string }, AddPasswordDto>({
      query: (password) => ({
        url: `passwords/addPassword`,
        method: 'POST',
        body: password,
      }),
      invalidatesTags: ['Password'],
    }),
    updatePassword: build.mutation<{ message: string }, UpdatePasswordDto>({
      query: (password) => ({
        url: `passwords/updatePassword`,
        method: 'PUT',
        body: password,
      }),
      invalidatesTags: ['Password'],
    }),
    deletePassword: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `passwords/deletePassword/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Password'],
    }),
    generatePassword: build.mutation<IGeneratedPassword, undefined>({
      query: () => ({
        url: `passwords/generate`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetAllPasswordsQuery,
  useDecryptPasswordQuery,
  useAddPasswordMutation,
  useUpdatePasswordMutation,
  useDeletePasswordMutation,
  useGeneratePasswordMutation,
} = passwordAPI;
