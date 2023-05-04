import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import alertReducer from './slices/alertSlice';
import { passwordAPI } from '../services/PasswordService';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    [passwordAPI.reducerPath]: passwordAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(passwordAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
