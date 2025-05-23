/* eslint-disable no-unused-vars */
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getToken } from "../../../helper/SessionHelper.js";
import { ErrorToast } from "../../../helper/ValidationHelper.js";
import TagTypes from "../../../constant/tagType.constant.js";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://13.51.51.176:9090/api/v1",
    //baseUrl: "http://localhost:9090/api/v1",
    // eslint-disable-next-line no-unused-vars
    prepareHeaders: async (headers, {getState, endpoint}) =>{
        if(getToken()){
            headers.set("Authorization", getToken());
        }
        return headers;
    }
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      localStorage.clear();
      ErrorToast("Authorization Expired");
      window.location.href = "/";
    }
    return result;
  },
  tagTypes: Object.values(TagTypes), //TagS WhiteLists
  endpoints: (builder) => ({}),
});


