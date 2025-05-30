/* eslint-disable no-empty */
import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const restaurantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRestaurant: builder.mutation({
      query: (data) => ({
        url: `/restaurant/create-restaurant`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.restaurant]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Restaurant Create Success");
        } catch (err) {
            console.log(err);
          const status = err?.error?.status;
          if (status === 409) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    getMyRestaurant: builder.query({
      query: () => ({
        url: `/restaurant/get-owner-restaurant`,
        method: "GET",
      }),
      providesTags: [TagTypes.restaurant],
      async onQueryStarted() {
        try {
        } catch (err) {
          console.log(err);
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          } else if (status === 409) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    updateRestaurant: builder.mutation({
      query: (data) => ({
        url: `/restaurant/update-restaurant`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.restaurant]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
            SuccessToast("Restaurant is updated successfully");
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          } else if (status === 409) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    updateRestaurantImg: builder.mutation({
      query: (data) => ({
        url: `/restaurant/update-restaurant-img`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.restaurant]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
            SuccessToast("Image is updated successfully");
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          }else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
  }),
});


export const { useCreateRestaurantMutation, useGetMyRestaurantQuery, useUpdateRestaurantMutation, useUpdateRestaurantImgMutation } = restaurantApi;