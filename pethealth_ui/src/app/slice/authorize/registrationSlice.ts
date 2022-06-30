import { AppThunk, RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthorize, setRole } from "../AuthorizeSlice";
import { jwtService } from "../../jwtService";
import { authApi } from "../../api/authApi";
import { handleAuthResponse } from "../../../utils/functions";
import { setError } from "../notificationSlice";

export interface RegistrationState {
  name?: string;
  email?: string;
  password?: string;
  role?: number;
  clinicName?: string;
}

const initialState: RegistrationState = {};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegistrationName: (
      state: RegistrationState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setRegistrationPassword: (
      state: RegistrationState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        password: action.payload,
      };
    },
    setRegistrationEmail: (
      state: RegistrationState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setRegistrationRole: (
      state: RegistrationState,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        role: action.payload,
      };
    },
    setClinicName: (
      state: RegistrationState,
      action: PayloadAction<string>
    ) => {
      state.clinicName = action.payload;
    },
  },
});
export const {
  setRegistrationEmail,
  setRegistrationPassword,
  setRegistrationName,
  setRegistrationRole,
  setClinicName,
} = registrationSlice.actions;

export default registrationSlice.reducer;
export const selectRegistration = (state: RootState) => state.registration;

export const registrateThunk = (): AppThunk => (dispatch, getState) => {
  const state = selectRegistration(getState());

  dispatch(authApi.endpoints.registration.initiate(state)).then((response) => {
    if ("data" in response) {
      handleAuthResponse(response.data);
      dispatch(setAuthorize(true));
      dispatch(setRole(jwtService.getRole()!));
    } else {
      dispatch(setError("registrate"));
    }
  });
};
