import {apiSlice} from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const slotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
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
          url: "/slot/get-slots",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.slots],
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
    createSlot: builder.mutation({
      query: (data) => ({
        url: `/slot/create-slot`,
        method: "POST",
        body: data,
      }),
      //invalidatesTags: [TagTypes.cuisine],
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.slots]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Slot is created successfully");
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
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/slot/delete-slot/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: [TagTypes.cuisine],
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.slots]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Slot is deleted successfully");
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


export const { useGetSlotsQuery, useCreateSlotMutation, useDeleteSlotMutation } = slotApi;