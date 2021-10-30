import { RootState } from "./../../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadUserPets } from "../../api/function/petsAPI";
export interface PetElementState {
  id: number;
  name: string;
  birthDay: string;
  kind: string;
}

export interface PetsState {
  pets?: Array<PetElementState>;
}

const initialState: PetsState = {};

export const loadUserPetsAsync = createAsyncThunk("pets/load", async () => {
  const response = await loadUserPets();
  return response.data;
});

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserPetsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        pets: action.payload as Array<PetElementState>,
      };
    });
  },
});

export default petsSlice.reducer;
export const selectPets = (state: RootState) => state.pets;
