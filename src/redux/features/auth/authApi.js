import { apiSlice } from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import { logout, setEmail, setOtp, setToken } from "../../../helper/SessionHelper.js";


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login-owner",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast("Login Success");
          setToken(res?.data?.data?.accessToken);
          console.log(res?.data?.data?.accessToken);
          setTimeout(() => {
            window.location.href = "/";
          }, 300);
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast("Could not Find this Email!");
          }else if (status === 403) {
            ErrorToast(err?.error?.data?.message);
          } else if (status === 400) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    forgotPassSendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Please cheack your email inbox");
          setEmail(arg.email);
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast("Could not Find this Email!");
          }else if (status === 403) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    forgotPassVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Otp is verified successfully");
          setOtp(arg.otp);
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast("Could not Find this Email!");
          } else if (status === 400) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    forgotPassCreateNewPass: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-create-new-pass",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is reset successfully");
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/";
          }, 300);
        } catch (err) {
          const status = err?.error?.status;
          if (status === 404) {
            ErrorToast("Could not Find this Email!");
          } else if (status === 400) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is updated successfully");
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/login";
          }, 400);
        } catch (err) {
          const status = err?.error?.status;
          if (status === 400) {
            ErrorToast(err?.error?.data?.message);
          } else {
            ErrorToast("Something Went Wrong!");
          }
        }
      },
    }),
  }),
});


export const { useLoginMutation, useForgotPassSendOtpMutation, useForgotPassVerifyOtpMutation, useForgotPassCreateNewPassMutation, useChangePasswordMutation } = authApi;