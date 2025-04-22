import {apiSlice} from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const tableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query({
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
          url: "/schedule/get-schedules",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.schedules],
    }),
    createSchedule: builder.mutation({
      query: (data) => ({
        url: `/schedule/create-schedule`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.schedules]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Schedule created successfully");
        } catch (err) {
          const status = err?.error?.status;
          if (status === 409) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/schedule/delete-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.schedules]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Schedule is deleted successfully");
        } catch (err) {
          console.log(err);
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


export const { useGetSchedulesQuery, useCreateScheduleMutation, useDeleteScheduleMutation } = tableApi;