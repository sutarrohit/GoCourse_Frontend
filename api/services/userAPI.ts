import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

import dotenv from "dotenv";
dotenv.config();

interface LoginUserData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: SerializedError;
  message: string;
  token: string;
  role: string;
}

interface SingupUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface signupResponse {
  message: string;
}

interface verificationResponse {
  status: string;
  message: string;
}

interface forgortPasswordData {
  email: string;
}

interface forgortPasswordResponse {
  message: string;
}

interface resetPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

interface resetPasswordResponse {
  message: string;
  token: string;
}

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  }),
  endpoints: (builder) => ({
    // User login route
    loginUser: builder.mutation<LoginResponse, LoginUserData>({
      query: (userData) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: userData,
      }),
    }),

    // User singup route
    signupUser: builder.mutation<signupResponse, SingupUserData>({
      query: (userData) => ({
        url: "/api/v1/user/signup",
        method: "POST",
        body: userData,
      }),
    }),

    // Signup verification route
    signupVerification: builder.mutation<verificationResponse, string>({
      query: (userData) => ({
        url: `/api/v1/user/userVerification/${userData}`,
        method: "PATCH",
      }),
    }),

    // Forget password
    forgotPassword: builder.mutation<
      forgortPasswordResponse,
      forgortPasswordData
    >({
      query: (userData) => ({
        url: "/api/v1/user/forgotPassword",
        method: "POST",
        body: userData,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<resetPasswordResponse, resetPasswordData>({
      query: (userData) => ({
        url: `/api/v1/user/resetPassword/${userData.token}`,
        method: "PATCH",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useSignupVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userAPI;
