import { RootState } from "./../../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPetRecord } from "../../api/function/clinicAPI";

export interface ClinicRecordAddState {
  description?: string;
  temperature?: number;
  pulse?: string;
  weight?: number;
  petId: number;
}

const initialState: ClinicRecordAddState = {
  petId: 0,
};

export const addHealthRecordAsync = createAsyncThunk(
  "ClinicRecordAdd/add",
  async (record: ClinicRecordAddState) => {
    const response = await addPetRecord(record);
    return response.data;
  }
);

export const clinicRecordAddSlice = createSlice({
  name: "ClinicRecordAdd",
  initialState,
  reducers: {
    setPetId: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        petId: payload,
      };
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        description: payload,
      };
    },
    setTemperature: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        temperature: payload,
      };
    },
    setPulse: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        pulse: payload,
      };
    },
    setWeight: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        weight: payload,
      };
    },
  },
});

export const { setWeight, setPulse, setTemperature, setDescription, setPetId } =
  clinicRecordAddSlice.actions;
export const selectClinicRecordAdd = (state: RootState) =>
  state.clinicRecordAdd;
export default clinicRecordAddSlice.reducer;
