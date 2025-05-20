import {apiSlice} from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const reservationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
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
          url: "/reservation/get-reservations",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.reservations],
    }),
    getCalendars: builder.query({
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
          url: "/reservation/get-calendars",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.calendars],
    }),
    getReservationsByDate: builder.query({
      query: (date) => {
        return {
          url: `/reservation/get-reservations-by-date/${date}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.reservationByDate],
    }),
    createReservation: builder.mutation({
      query: (data) => ({
        url: `/reservation/create-reservation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.reservations, TagTypes.reservationByDate]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Reservation created successfully");
        } catch (err) {   
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast(err?.error?.data?.message);
          }else {
            ErrorToast("Something Went Wrong!");
          }        }
      },
    }),
   updateReservation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reservation/update-reservation/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.reservations, TagTypes.reservationByDate]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
            SuccessToast("Schedule is updated successfully");
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
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservation/delete-reservation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.reservations, TagTypes.reservationByDate]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Schedule is deleted successfully");
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
  }),
});


export const { useGetReservationsQuery, useGetCalendarsQuery, useGetReservationsByDateQuery, useCreateReservationMutation, useUpdateReservationMutation, useDeleteReservationMutation  } = reservationApi;