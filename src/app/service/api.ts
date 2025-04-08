import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types/user.type"; 

const baseQuery = fetchBaseQuery({
    baseUrl:'https://jsonplaceholder.typicode.com/'
})

const baseQueryApi = retry(baseQuery, {maxRetries: 1})
export const Api = createApi({
    reducerPath:'serverApi',
    baseQuery: baseQueryApi,
    endpoints: () => ({})
})

export const serverApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
          query: () => ({
            url: 'users',
            method: 'GET',
          }),
        }),
        getUser: builder.query<User, string>({
            query: (id) => ({
              url: `users/${id}`,
              method: 'GET',
            })
        }),
      })
})

export const {useGetUsersQuery, useGetUserQuery} = serverApi
export const {endpoints:{getUsers, getUser}} = serverApi