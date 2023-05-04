import { createSlice } from '@reduxjs/toolkit';
import { UserState, authError } from './user.interface';
import { defaultState, login } from './user.action';
import { localStorageName } from '../../../http';

const initialState: UserState = localStorage.getItem(localStorageName)
  ? JSON.parse(localStorage.getItem(localStorageName) as string)
  : defaultState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem(localStorageName);
      return defaultState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (_, { payload }) => {
      return { ...payload, isLoading: false, error: null };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as authError;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
