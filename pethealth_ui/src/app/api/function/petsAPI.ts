import { HEALTH_RECORD_API } from "./../API_ADDRESS";
import { post, put } from "./../../api/apiService";
import { get } from "../../api/apiService";
import { PETS_API, PETS_CLINC_API } from "./../../api/API_ADDRESS";

export const loadUserPets = () => {
  return get(PETS_API + "/users");
};

export const loadClinicPets = () => {
  return get(PETS_CLINC_API);
};

export const loadPetsForClinic = (name: string) => {
  return get(PETS_API + "?name=" + name);
};

export const loadPet = (petId: number) => {
  return get(PETS_API + "/" + petId);
};

export const updatePet = (pet: any) => {
  return put(PETS_API, pet);
};

export const addPet = (pet: any) => {
  return post(PETS_API, pet);
};

export const loadPetHealthRecord = (petId: number) => {
  return get(HEALTH_RECORD_API + "?petId=" + petId);
};
