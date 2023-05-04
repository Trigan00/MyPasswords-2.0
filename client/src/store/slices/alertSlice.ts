import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

interface setAlertAction {
  severity: AlertColor;
  message: string;
  duration: number;
}

const initialState: {
  isOpen: boolean;
  severity: AlertColor | undefined;
  message: string | null;
  duration: number;
} = {
  isOpen: false,
  severity: undefined,
  message: null,
  duration: 6000,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<setAlertAction>) {
      state.isOpen = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
    },
    removeAlert(state) {
      state.isOpen = false;
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
