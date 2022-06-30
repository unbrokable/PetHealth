import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser } from "../../api/function/adminAPI";
import { RootState } from "../../store";

export interface UserAddState {
  name: string;
  email: string;
  password: string;
  role: number;
}

const initialState: UserAddState = {
  name: "",
  email: "",
  password: "",
  role: 0,
};

export const addUserAsync = createAsyncThunk(
  "user/add",
  async (user: UserAddState) => {
    await addUser(user);
  }
);

export const userAddSlice = createSlice({
  name: "useradd",
  initialState,
  reducers: {
    setUserAddName: (
      state: UserAddState,
      { payload }: PayloadAction<string>
    ) => {
      return {
        ...state,
        name: payload,
      };
    },
    setUserAddEmail: (
      state: UserAddState,
      { payload }: PayloadAction<string>
    ) => {
      return {
        ...state,
        email: payload,
      };
    },
    setUserAddPassword: (
      state: UserAddState,
      { payload }: PayloadAction<string>
    ) => {
      return {
        ...state,
        password: payload,
      };
    },
    setUserAddRole: (
      state: UserAddState,
      { payload }: PayloadAction<number>
    ) => {
      return {
        ...state,
        role: payload,
      };
    },
  },
});

export const {
  setUserAddRole,
  setUserAddPassword,
  setUserAddEmail,
  setUserAddName,
} = userAddSlice.actions;

export default userAddSlice.reducer;

export const selectUserAdd = (state: RootState) => state.userAdd;
