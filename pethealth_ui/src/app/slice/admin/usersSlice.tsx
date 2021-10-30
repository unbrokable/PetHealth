import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loadRemovedUsers,
  loadUsers,
  recoveUser,
  removeUser,
} from "../../api/function/adminAPI";
import { RootState } from "../../store";

export interface UserState {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UsersState {
  users?: Array<UserState>;
  removedUser?: Array<UserState>;
  showUsers: boolean;
}

const initialState: UsersState = {
  showUsers: true,
};

export const loadUsersAsync = createAsyncThunk("users/load", async () => {
  const response = await loadUsers();
  return response.data;
});

export const removeUserAsync = createAsyncThunk(
  "user/remove",
  async (id: number) => {
    await removeUser(id);
    return id;
  }
);

export const loadRemovedUsersAsync = createAsyncThunk(
  "users/removed",
  async () => {
    const response = await loadRemovedUsers();
    return response.data;
  }
);

export const recoveUserAsync = createAsyncThunk(
  "users/recover",
  async (id: number) => {
    await recoveUser(id);
    return id;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setshowUsers: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        showUsers: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsersAsync.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload as any,
        };
      })
      .addCase(loadRemovedUsersAsync.fulfilled, (state, action) => {
        return {
          ...state,
          removedUser: action.payload as any,
        };
      })
      .addCase(removeUserAsync.fulfilled, (state, action) => {
        return {
          ...state,
          users: state.users?.filter((i) => +i.id !== +action.payload),
        };
      })
      .addCase(recoveUserAsync.fulfilled, (state, action) => {
        return {
          ...state,
          removedUser: state.removedUser?.filter(
            (i) => +i.id !== +action.payload
          ),
        };
      });
  },
});

export const { setshowUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users;
