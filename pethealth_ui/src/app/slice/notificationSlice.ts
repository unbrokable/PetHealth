import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ErrorState {
  errorMessage?: string;
  message?: string;
}

const initialState: ErrorState = {};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setError: (
      state: ErrorState,
      { payload }: PayloadAction<string | undefined>
    ) => {
      return {
        ...state,
        errorMessage: payload,
      };
    },
    setMessage: (
      state: ErrorState,
      { payload }: PayloadAction<string | undefined>
    ) => {
      return {
        ...state,
        message: payload,
      };
    },
  },
});

export const { setError, setMessage } = errorSlice.actions;
export const selectNotification = (state: RootState) => state.notification;

export default errorSlice.reducer;
