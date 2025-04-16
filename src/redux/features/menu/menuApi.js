import {apiSlice} from "../api/apiSlice.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const menuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query({
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
          url: "/menu/get-menus",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.menus],
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
    createMenu: builder.mutation({
      query: (data) => ({
        url: `/menu/create-menu`,
        method: "POST",
        body: data,
      }),
      //invalidatesTags: [TagTypes.cuisine],
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.menus]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Menu is created successfully");
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
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/delete-menu/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: [TagTypes.cuisine],
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.menus]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Menu is deleted successfully");
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
    updateMenu: builder.mutation({
      query: ({ id, data }) => ({
        url: `/menu/update-menu/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) =>{
        if(result?.success){
          return [TagTypes.cuisine]
        }
        return []
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
            SuccessToast("Menu is updated successfully");
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


export const { useGetMenusQuery, useCreateMenuMutation, useDeleteMenuMutation, useUpdateMenuMutation } = menuApi;