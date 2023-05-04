import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../store';
import {
  AddPasswordDto,
  IDecryptedPassword,
  IEncryptedPassword,
  IGeneratedPassword,
  UpdatePasswordDto,
} from './Password.interface';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { API_URL } from '../http';

export const getErrorData = (
  error: FetchBaseQueryError | SerializedError | undefined,
  prop: string,
) => {
  if (error && 'status' in error) {
    const data = JSON.stringify(error.data);
    return JSON.parse(data)[prop];
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}passwords`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
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

export const passwordAPI = createApi({
  reducerPath: 'passwordAPI',
  baseQuery,
  tagTypes: ['Password'],
  endpoints: (build) => ({
    getAllPasswords: build.query<IEncryptedPassword[], undefined>({
      query: () => ({
        url: `/allPasswords`,
      }),
      providesTags: (result) => ['Password'],
    }),
    decryptPassword: build.query<IDecryptedPassword, number>({
      query: (id) => ({
        url: `/decrypt/${id}`,
      }),
    }),
    addPassword: build.mutation<{ message: string }, AddPasswordDto>({
      query: (password) => ({
        url: `/addPassword`,
        method: 'POST',
        body: password,
      }),
      invalidatesTags: ['Password'],
    }),
    updatePassword: build.mutation<{ message: string }, UpdatePasswordDto>({
      query: (password) => ({
        url: `/updatePassword`,
        method: 'PUT',
        body: password,
      }),
      invalidatesTags: ['Password'],
    }),
    deletePassword: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/deletePassword/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Password'],
    }),
    generatePassword: build.mutation<IGeneratedPassword, undefined>({
      query: () => ({
        url: `/generate`,
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
