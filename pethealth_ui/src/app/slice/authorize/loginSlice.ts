import { authApi } from "./../../api/authApi";
import { jwtService } from "./../../jwtService";
import { AppThunk, RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthorize, setRole } from "../AuthorizeSlice";
import { setError } from "../notificationSlice";
import { handleAuthResponse } from "../../../utils/functions";
export interface LoginState {
  email?: string;
  password?: string;
}

const initialState: LoginState = {};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state: LoginState, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setPassword: (state: LoginState, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload,
      };
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;

export const selectLogin = (state: RootState) => state.login;

export const loginThunk = (): AppThunk => (dispatch, getState) => {
  const state = selectLogin(getState());

  dispatch(authApi.endpoints.login.initiate(state)).then((response) => {
    if ("data" in response) {
      handleAuthResponse(response.data);
      dispatch(setAuthorize(true));
      dispatch(setRole(jwtService.getRole()!));
    } else {
      dispatch(setError("login"));
    }
  });
};

export const loginWithGoogle =
  (token: string): AppThunk =>
  (dispatch) => {
    dispatch(authApi.endpoints.loginWithGoogle.initiate(token)).then(
      (response) => {
        if ("data" in response) {
          handleAuthResponse(response.data);
          dispatch(setAuthorize(true));
          dispatch(setRole(jwtService.getRole()!));
        } else {
          dispatch(setError("login"));
        }
      }
    );
  };
