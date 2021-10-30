import { RootState } from "./../../store";
import { PetElementState } from "../user/petsSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removePetFromClinic } from "../../api/function/clinicAPI";
import { loadClinicPets } from "../../api/function/petsAPI";
export interface ClinicState {
  name: string;
  pets?: Array<PetElementState>;
}

const initialState: ClinicState = {
  name: "",
};

export const loadClinicAsync = createAsyncThunk("clinic/load", async () => {
  return "";
});

export const loadClinicPetsAsync = createAsyncThunk(
  "clinic/loadPets",
  async () => {
    const response = await loadClinicPets();
    return response.data;
  }
);

export const removePetFromClinicAsync = createAsyncThunk(
  "clinic/removePet",
  async (petId: number) => {
    await removePetFromClinic(petId);
    return petId;
  }
);

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removePetFromClinicAsync.fulfilled, (state, action) => {
        return {
          ...state,
          pets: state.pets?.filter((i) => +i.id !== action.payload),
        };
      })
      .addCase(loadClinicPetsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          pets: action.payload as any,
        };
      })
      .addCase(loadClinicAsync.fulfilled, (state, action) => {
        return {
          ...state,
          name: action.payload as string,
        };
      });
  },
});

export const selectClinic = (state: RootState) => state.clinic;
export default clinicSlice.reducer;
