import { LoginState } from "./../slice/authorize/loginSlice";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./shared";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginState>({
      query: (credentials) => ({
        url: "account/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registration: builder.mutation({
      query: (credentials) => ({
        url: "account/registration",
        method: "POST",
        body: credentials,
      }),
    }),
    loginWithGoogle: builder.mutation({
      query: (credentials) => ({
        url: `account/google/${credentials}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
