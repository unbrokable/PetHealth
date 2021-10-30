import { jwtService } from "./../../jwtService";
import { AppThunk, RootState } from "./../../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "./../../api/function/authorizeAPI";
import { setAuthorize, setRole } from "../AuthorizeSlice";
import { setError } from "../notificationSlice";
export interface LoginState {
  email?: string;
  password?: string;
}

const initialState: LoginState = {};

export const loginAsync = createAsyncThunk(
  "loginSlice/login",
  async (data: LoginState) => {
    const response = await login(data);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload,
      };
    },
  },
});

export const { setPassword, setEmail } = loginSlice.actions;
export default loginSlice.reducer;

export const selectLogin = (state: RootState) => state.login;

export const loginThunk = (): AppThunk => (dispatch, getState) => {
  const state = selectLogin(getState());
  dispatch(loginAsync(state)).then((a) => {
    if (a?.type?.endsWith("fulfilled")) {
      dispatch(setAuthorize(true));
      dispatch(setRole(jwtService.getRole()!));
    } else {
      dispatch(setError("login"));
    }
  });
};
