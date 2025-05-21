/* eslint-disable no-unused-vars */
import {apiSlice} from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
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
          url: "/review/get-my-restaurant-reviews",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,//seconds
      providesTags: [TagTypes.reviews],
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
    deleteReview: builder.mutation({
          query: (id) => ({
            url: `/review/delete-review/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: (result) =>{
            if(result?.success){
              return [TagTypes.reviews]
            }
            return []
          },
          async onQueryStarted(arg, { queryFulfilled }) {
            try {
              await queryFulfilled;
              SuccessToast("Review is deleted successfully");
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
  }),
});


export const { useGetReviewsQuery, useDeleteReviewMutation } = reviewApi;