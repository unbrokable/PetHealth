import { RootState } from "./../../store";
import { selectPets } from "./petsSlice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePet } from "../../api/function/petsAPI";
import { AppThunk } from "../../store";
import { PetAddState } from "./petAddSlice";

export interface PetUpdateState extends PetAddState {
  id: number;
}

const initialState: PetUpdateState = {
  id: 0,
  birthDay: new Date(),
};

export const updatePetAsync = createAsyncThunk(
  "petUpdate",
  async (newPet: PetUpdateState) => {
    const response = await updatePet(newPet);
    return response.data;
  }
);

export const petUpdateSlice = createSlice({
  name: "petUpdate",
  initialState,
  reducers: {
    setPetUpdateName: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        name: payload,
      };
    },
    setPetUpdateDate: (state, { payload }: PayloadAction<Date>) => {
      return {
        ...state,
        birthDay: payload,
      };
    },
    setPetUpdateKind: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        kind: payload,
      };
    },
    setPetUpdate: (state, { payload }: PayloadAction<PetUpdateState>) => {
      return {
        ...payload,
      };
    },
  },
});

export const {
  setPetUpdate,
  setPetUpdateKind,
  setPetUpdateDate,
  setPetUpdateName,
} = petUpdateSlice.actions;

export const selectPetUpdate = (state: RootState) => state.petUpdate;

export default petUpdateSlice.reducer;

export const setPetUpdateThunk =
  (id: number): AppThunk =>
  (dispatch, getState) => {
    const pet = selectPets(getState()).pets?.find((i) => +i.id === +id)!;
    dispatch(
      setPetUpdate({
        ...pet,
        birthDay: new Date(pet.birthDay),
      } as PetUpdateState)
    );
  };
