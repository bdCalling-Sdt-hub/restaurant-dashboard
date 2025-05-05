import {apiSlice} from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper.js";
import { SetDiningId, SetScheduleId, SetSelectedDate } from "../table/tableSlice.js";
import { SetBooking } from "./bookingSlice.js";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
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
          url: "/booking/get-bookings",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 60,//seconds
      providesTags: [TagTypes.bookings],
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
    updateBookingStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/booking/update-booking-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.bookings];
        }
        return [];
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Customer is forwarded to waitlist");
        } catch (err) {
          const status = err?.error?.status;
          console.log(err);
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
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/booking/get-single-booking/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (result, error, arg) => [ {type: TagTypes.booking, id:arg}],
      // async onQueryStarted(arg, { queryFulfilled, dispatch}) {
      //   try {
      //     const res = await queryFulfilled;
      //     const data = res?.data?.data;
      //     dispatch(SetBooking(data));
      //     const date = data?.date?.split("T")[0];
      //     dispatch(SetSelectedDate(date))
      //     dispatch(SetScheduleId("")); 
      //     dispatch(SetDiningId(""));       
      //   } catch (err) {
      //     //ErrorToast("Something Went Wrong!");
      //     //do nothing
      //     //console.log(err);
      //   }
      // },
    }),

  }),
});


export const { useGetBookingsQuery, useUpdateBookingStatusMutation, useGetSingleBookingQuery} = bookingApi;