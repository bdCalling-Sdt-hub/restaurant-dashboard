import {apiSlice} from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const tableBookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTableBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item) => {
            if(item.value){
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/table-booking/get-table-bookings",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.tableBookings],
    }),
    createTableBooking: builder.mutation({
      query: (data) => ({
        url: `/table-booking/create-table-booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.tableBookings,TagTypes.bookings, TagTypes.tables, TagTypes.tablesByScheduleAndDining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Table Booked successfully");
        } catch (err) {  
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          }
          else if (status === 400) {
            ErrorToast(err?.error?.data?.message);
          }else if (status === 403) {
              ErrorToast(err?.error?.data?.message);   
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    changeAvailibility: builder.mutation({
      query: ({ id, data }) => ({
        url: `/table-booking/change-availability/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.tableBookings];
        }
        return [];
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Availibility is updated successfully");
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    deleteTableBooking: builder.mutation({
      query: (id) => ({
        url: `/table-booking/delete-table-booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.tableBookings, TagTypes.tables, TagTypes.tablesByScheduleAndDining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Table Booking is deleted successfully");
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


export const { useGetTableBookingsQuery, useCreateTableBookingMutation, useChangeAvailibilityMutation, useDeleteTableBookingMutation } = tableBookingApi;