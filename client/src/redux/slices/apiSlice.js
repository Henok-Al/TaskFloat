import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URI = "http://localhost:8800/api";
const API_URI = "https://taskfloat.onrender.com/api";


const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
