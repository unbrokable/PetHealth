import { jwtService } from "./../jwtService";
import { Clinic, ClinicShort } from "./../types/Clinic";
import { baseQuery } from "./shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HOST_API } from "./API_ADDRESS";

export const clinicsApi = createApi({
  reducerPath: "clinicsApi",
  baseQuery: baseQuery,
  tagTypes: ["Clinics"],
  endpoints: (builder) => ({
    getClinics: builder.query<Array<ClinicShort>, string>({
      query: () => ({
        url: "clinics",
        method: "GET",
      }),
    }),
    getClinic: builder.query<Clinic, number>({
      query: (id) => ({
        url: `clinics/${id}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation<any, { id: number; text: string }>({
      query: (data) => ({
        url: `clinics/${data.id}/comments`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const getReport = () => {
  fetch(HOST_API + "clinics/pets/pdf", {
    method: "GET",
    headers: {
      authorization: `Bearer ${jwtService.get()}`,
      "Content-Type": "application/pdf",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Report.pdf`);

      document.body.appendChild(link);

      link.click();

      link?.parentNode?.removeChild(link);
    });
};

export const { useAddCommentMutation, useGetClinicQuery, useGetClinicsQuery } =
  clinicsApi;
