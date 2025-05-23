/* eslint-disable no-empty */
import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast} from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalIncome: builder.query({
      query: () => ({
        url: `/payment/get-total-income`,
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
  }),
});


export const { useGetTotalIncomeQuery } = dashboardApi;