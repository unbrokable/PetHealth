import { RootState } from "./../../store";
import { addPetToClinic } from "./../../api/function/clinicAPI";
import { loadPetsForClinic } from "./../../api/function/petsAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PetElementState } from "./../user/petsSlice";

export interface ClinicPetAddState {
  filterName: string;
  pets?: Array<PetElementState>;
}

const initialState: ClinicPetAddState = {
  filterName: "",
};

export const addPetToClinicAsync = createAsyncThunk(
  "ClinicPetadd/add",
  async (petId: number) => {
    await addPetToClinic(petId);
    return petId;
  }
);

export const loadPetsForClinicAsync = createAsyncThunk(
  "ClinicPetadd/load",
  async (filterName: string) => {
    const response = await loadPetsForClinic(filterName);
    return response.data;
  }
);

export const clinicPetAddSlice = createSlice({
  name: "ClinicPetadd",
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        filterName: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPetsForClinicAsync.fulfilled, (state, action) => {
        return {
          ...state,
          pets: action.payload as any,
        };
      })
      .addCase(addPetToClinicAsync.fulfilled, (state, action) => {
        return {
          ...state,
          pets: state.pets?.filter((i) => +i.id !== +action.payload),
        };
      });
  },
});

export const { setFilterName } = clinicPetAddSlice.actions;
export const selectClinicPetAdd = (state: RootState) => state.clinicPetAdd;
export default clinicPetAddSlice.reducer;
