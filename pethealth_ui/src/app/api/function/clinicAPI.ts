import { CLINIC_PETS_API } from "./../API_ADDRESS";
import { delet, post } from "../apiService";

export const addPetToClinic = (petId: number) => {
  return post(CLINIC_PETS_API + "/" + petId);
};

export const removePetFromClinic = (petId: number) => {
  return delet(CLINIC_PETS_API + "/" + petId);
};

export const addPetRecord = (record: any) => {
  return post(CLINIC_PETS_API + "/records", record);
};
