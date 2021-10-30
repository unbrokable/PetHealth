import { RegistrationState } from "./../../slice/authorize/registrationSlice";
import { LOGIN_API, REGISTRATION_API } from "./../API_ADDRESS";
import axios from "axios";
import { jwtService } from "../../jwtService";
import { LoginState } from "../../slice/authorize/loginSlice";
import { handleError } from "../apiService";

export interface AuthorizationResponseState {
  role: string;
  accessToken: string;
}

export const login = async (data: LoginState) => {
  let response = await axios.post(LOGIN_API, data).catch(handleError);
  handleData(response.data);
  return response;
};

export const registrate = async (data: RegistrationState) => {
  let response = await axios.post(REGISTRATION_API, data);
  handleData(response.data);
  return response;
};

const handleData = (data: any) => {
  jwtService.remove();
  jwtService.set(data.accessToken);
  jwtService.setRole(data.role);
};
