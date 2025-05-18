import {apiSlice} from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";
import { SetDiningOptions } from "./diningSlice.js";

export const diningApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiningList: builder.query({
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
          url: "/dining/get-dining-list",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.dining],
    }),
    createDining: builder.mutation({
      query: (data) => ({
        url: `/dining/create-dining`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.dining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Dining is created successfully");
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
    deleteDining: builder.mutation({
      query: (id) => ({
        url: `/dining/delete-dining/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.dining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Dining is deleted successfully");
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
    updateDining: builder.mutation({
      query: ({ id, data }) => ({
        url: `/dining/update-dining/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) =>{
        if(result?.success){
          return [TagTypes.dining]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
            SuccessToast("Dining is updated successfully");
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
    getMyDinings: builder.query({
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
          url: "/dining/get-my-dinings",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.myDining],
      async onQueryStarted(arg, { queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (err) {
          //ErrorToast("Something Went Wrong!");
          //do nothing
          //console.log(err);
        }
      },
    }),
    getDiningDropDown: builder.query({
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
          url: "/dining/get-dining-drop-down",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.diningDropDown],
      async onQueryStarted(arg, { queryFulfilled, dispatch}) {
        try {
          await queryFulfilled;
          const res = await queryFulfilled;
          const dinings = res?.data?.data;
          const Options = dinings?.map((dining) => ({
            value: dining?._id,
            label: dining?.name
          }));

          dispatch(SetDiningOptions(Options))
        } catch (err) {
          //ErrorToast("Something Went Wrong!");
          //do nothing
          //console.log(err);
        }
      },
    }),
  }),
});


export const { useGetDiningListQuery, useCreateDiningMutation, useUpdateDiningMutation, useDeleteDiningMutation, useGetMyDiningsQuery, useGetDiningDropDownQuery } = diningApi;