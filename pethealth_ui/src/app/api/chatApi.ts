import { baseQuery } from "./shared";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { Chat } from "../types/Chat";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getChats: builder.query<Array<Chat>, string>({
      query: () => ({
        url: "chats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetChatsQuery } = chatApi;
