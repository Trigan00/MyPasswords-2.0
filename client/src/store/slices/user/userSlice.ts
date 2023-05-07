import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserState, authError } from './user.interface';
import { checkAuth, defaultState, login, logout } from './user.action';
import { localStorageName } from '../../../http';

const initialState: UserState = localStorage.getItem(localStorageName)
  ? JSON.parse(localStorage.getItem(localStorageName) as string)
  : defaultState;

const setError = (state: UserState, action: PayloadAction<unknown>) => {
  state.isLoading = false;
  state.error = action.payload as authError;
};
const setPending = (state: UserState) => {
  state.error = null;
  state.isLoading = true;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, setPending);
    builder.addCase(checkAuth.pending, setPending);
    builder.addCase(logout.pending, setPending);

    builder.addCase(login.fulfilled, (_, { payload }) => {
      return { ...payload, isLoading: false, error: null };
    });
    builder.addCase(checkAuth.fulfilled, (_, { payload }) => {
      return { ...payload, isLoading: false, error: null };
    });
    builder.addCase(logout.fulfilled, (_, { payload }) => {
      return { ...(payload as UserState) };
    });

    builder.addCase(login.rejected, setError);
    builder.addCase(checkAuth.rejected, setError);
    builder.addCase(logout.rejected, setError);
  },
});

export const { updateToken } = userSlice.actions;
export default userSlice.reducer;
