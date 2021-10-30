import { RootState } from "./../../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPet } from "../../api/function/petsAPI";

export interface PetAddState {
  name?: string;
  birthDay: Date;
  kind?: string;
}

const initialState: PetAddState = {
  birthDay: new Date(),
};

export const addPetAsync = createAsyncThunk(
  "petAdd/add",
  async (pet: PetAddState) => {
    const response = await addPet(pet);
    return response.data;
  }
);

export const petAddSlice = createSlice({
  name: "petAdd",
  initialState,
  reducers: {
    setPetAddName: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        name: payload,
      };
    },
    setPetAddDate: (state, { payload }: PayloadAction<Date>) => {
      return {
        ...state,
        birthDay: payload,
      };
    },
    setPetAddKind: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        kind: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPetAsync.fulfilled, (state, action) => {
      return {
        ...initialState,
      };
    });
  },
});

export const { setPetAddKind, setPetAddDate, setPetAddName } =
  petAddSlice.actions;

export const selectPetAdd = (state: RootState) => state.petAdd;

export default petAddSlice.reducer;
