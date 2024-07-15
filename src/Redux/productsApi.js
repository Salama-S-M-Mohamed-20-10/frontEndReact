// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import type { products } from './types'

// Get all data
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-node-olive.vercel.app/' }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({//<products, string>
      query: (name) => `products`,
    }),
  }),
})

// Get only one product
export const oneProductApi = createApi({
  reducerPath: 'oneProductApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend-node-olive.vercel.app/' }),
  endpoints: (builder) => ({
    getOneProductByName: builder.query({//<products, string>
      query: (name) => `products/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductsByNameQuery } = productsApi
export const { useGetOneProductByNameQuery } = oneProductApi