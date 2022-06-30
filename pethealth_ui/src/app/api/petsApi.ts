import { createApi } from "@reduxjs/toolkit/query/react";
import { PetHealthReport } from "../types/PetHealthReport";
import { baseQuery } from "./shared";

export const petsApi = createApi({
  reducerPath: "petsApi",
  baseQuery: baseQuery,
  tagTypes: ["Pets"],
  endpoints: (builder) => ({
    getPetsHealth: builder.query<Array<PetHealthReport>, string>({
      query: () => ({
        url: "pets/health",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPetsHealthQuery } = petsApi;
