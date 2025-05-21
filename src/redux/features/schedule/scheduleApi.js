import { apiSlice } from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/schedule/get-schedules",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.schedules],
    }),
    getSchedulesByDate: builder.query({
      query: (date) => {
        return {
          url: `/schedule/get-schedules-by-date/${date}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.schedulesByDate],
    }),
    getScheduleDropDown: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/schedule/get-schedule-drop-down",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.scheduleDropDown],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const schedules = res?.data?.data;
          if (schedules.length === 0) {
            ErrorToast("No schedules found for the selected date.");
            return;
          }
        } catch (err) {
          const status = err?.error?.status;
          if (status === 500) {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    createSchedule: builder.mutation({
      query: (data) => ({
        url: `/schedule/create-schedule`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            TagTypes.schedules,
            TagTypes.scheduleDropDown,
            TagTypes.schedulesByDate,
          ];
        }
        return [];
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
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            TagTypes.schedules,
            TagTypes.scheduleDropDown,
            TagTypes.schedulesByDate,
          ];
        }
        return [];
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

export const {
  useGetSchedulesQuery,
  useGetSchedulesByDateQuery,
  useGetScheduleDropDownQuery,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;
