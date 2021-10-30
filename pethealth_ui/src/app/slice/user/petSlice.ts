import { AppThunk, RootState } from "./../../store";
import { loadPet, loadPetHealthRecord } from "./../../api/function/petsAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectPets } from "./petsSlice";

export interface ClinicRecord {
  id: number;
  description: string;
  temperature: number;
  pulse: string;
  weight: number;
  date: string;
}

export interface PetState {
  id?: number;
  name?: string;
  records?: Array<ClinicRecord>;
}

const initialState: PetState = {};

export const loadPetHealthRecordAsync = createAsyncThunk(
  "pet/loadrecords",
  async (petId: number) => {
    const response = await loadPetHealthRecord(petId);
    return response.data;
  }
);

export const loadPetAsync = createAsyncThunk(
  "pet/load",
  async (petId: number) => {
    const response = await loadPet(petId);
    return response.data;
  }
);

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPetName: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        name: payload,
      };
    },
    setPetId: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        id: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPetHealthRecordAsync.fulfilled, (state, action) => {
      return {
        ...state,
        records: action.payload as any,
      };
    });
  },
});

export const { setPetId, setPetName } = petSlice.actions;
export default petSlice.reducer;
export const selectPet = (state: RootState) => state.pet;

export const setPet =
  (id: number): AppThunk =>
  (dispatch, getState) => {
    const pet = selectPets(getState()).pets?.find((i) => +i.id === +id)!;
    if (!pet) {
      dispatch(loadPetAsync(id)).then((act) => {
        if (act.type.endsWith("fulfilled")) {
          const petLoaded = act.payload as any;
          dispatch(setPetId(petLoaded.id));
          dispatch(setPetName(petLoaded.name));
          dispatch(loadPetHealthRecordAsync(id));
        }
      });
    } else {
      dispatch(setPetId(pet.id));
      dispatch(setPetName(pet.name));
      dispatch(loadPetHealthRecordAsync(id));
    }
  };
