import axios from "axios";
import { jwtService } from "./../jwtService";

export const get = (url: string) => {
  return axios
    .get(url, {
      headers: { Authorization: "Bearer " + jwtService.get() },
    })
    .catch(handleError);
};

export const post = (url: string, data?: any) => {
  debugger;
  return axios
    .post(url, data, {
      headers: { Authorization: "Bearer " + jwtService.get() },
    })
    .catch(handleError);
};

export const delet = (url: string) => {
  return axios
    .delete(url, {
      headers: { Authorization: "Bearer " + jwtService.get() },
    })
    .catch(handleError);
};
export const put = (url: string, data: any) => {
  return axios
    .put(url, data, {
      headers: { Authorization: "Bearer " + jwtService.get() },
    })
    .catch(handleError);
};

export const handleError = (error: any) => {
  if (error.response.status === 401) {
    jwtService.remove();
  }
  console.log(error.response.data);
  debugger;
  throw new Error(
    error.response.data.Message ||
      error.response.data.message ||
      Object.values(error.response.data.errors)[0]
  );
};
