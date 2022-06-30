import { ClinicComment } from "./Comment";

export interface Clinic extends ClinicShort {
  imageUrl?: string;
  comments: Array<ClinicComment>;
  amountOfPets: number;
  user: string;
}

export interface ClinicShort {
  id: number;
  name: string;
}
