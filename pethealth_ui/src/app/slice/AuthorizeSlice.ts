import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export enum RoleType {
  User,
  Owner,
  Admin,
}
export interface AuthorizeState {
  isAuthorize: boolean;
  role: string | null;
}

const initialState: AuthorizeState = {
  isAuthorize: false,
  role: null,
};

export const authorizeSlice = createSlice({
  name: "authorize",
  initialState,
  reducers: {
    setAuthorize: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuthorize: action.payload,
      };
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        role: action.payload,
      };
    },
    resertUser: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setRole, setAuthorize, resertUser } = authorizeSlice.actions;
export const selectAuthorize = (state: RootState) => state.authorize;
export default authorizeSlice.reducer;
