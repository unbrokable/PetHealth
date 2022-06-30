import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtService } from "../jwtService";
import { HOST_API } from "./API_ADDRESS";

export const baseQuery = fetchBaseQuery({
  baseUrl: HOST_API,
  prepareHeaders: (headers, { getState }) => {
    const token = jwtService.get();
    headers.set("Access-Control-Allow-Origin", "*");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
