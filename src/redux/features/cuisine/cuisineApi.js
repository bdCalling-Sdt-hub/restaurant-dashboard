import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const cuisineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCusineDropDown: builder.query({
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
          url: "/cuisine/get-cuisine-drop-down",
          method: "GET",
          params: params
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.cuisine],
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
  }),
});


export const { useGetCusineDropDownQuery } = cuisineApi;