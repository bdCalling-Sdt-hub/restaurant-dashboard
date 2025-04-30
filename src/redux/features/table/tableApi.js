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
          url: "/table/get-tables",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.tables],
    }),
    getTablesByScheduleAndDining: builder.query({
      query: ({scheduleId, diningId}) => {
        return {
          url: `/table/get-tables-by-schedule-and-dining/${scheduleId}/${diningId}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.tablesByScheduleAndDining],
    }),
    createTable: builder.mutation({
      query: (data) => ({
        url: `/table/create-table`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.tables, TagTypes.tablesByScheduleAndDining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Table created successfully");
        } catch (err) {   
          ErrorToast("Something Went Wrong!");  
        }
      },
    }),
    updateTable: builder.mutation({
      query: ({ id, data }) => ({
        url: `/table/update-table/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.tables, TagTypes.tablesByScheduleAndDining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
            SuccessToast("Table is updated successfully");
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
    deleteTable: builder.mutation({
      query: (id) => ({
        url: `/table/delete-table/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.tables, TagTypes.tablesByScheduleAndDining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Table is deleted successfully");
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


export const { useGetTablesQuery, useGetTablesByScheduleAndDiningQuery, useCreateTableMutation, useUpdateTableMutation, useDeleteTableMutation } = tableApi;