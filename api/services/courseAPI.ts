import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Icourse, IcourseData, IcourseDataOne } from "@/Interfaces/Interfaces";

interface buyCourseResponse {
  paymentUrl: string;
}

interface getPurchaseCourseResponse {
  coures: string[];
}

console.log(
  "rocess.env.NEXT_PUBLIC_SERVER_BASE_URL",
  process.env.NEXT_PUBLIC_SERVER_BASE_URL
);
export const courseAPI = createApi({
  reducerPath: "courseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://go-course-backend.vercel.app",

    prepareHeaders: (headers) => {
      let token: string | null = "";
      if (typeof window !== "undefined")
        token = localStorage.getItem("authToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  // Get courses
  endpoints: (builder) => ({
    getCourseData: builder.query<IcourseData, string>({
      query: () => "/api/v1/course/courses",
    }),

    // Get One course
    getOneCourse: builder.mutation<IcourseDataOne, string>({
      query: (userData) => ({
        url: `/api/v1/course/course/${userData}`,
        method: "GET",
      }),
    }),

    // Buy course
    buyCourse: builder.mutation<buyCourseResponse, string | undefined>({
      query: (userData) => ({
        url: "/api/v1/payment/create-checkout-session",
        method: "POST",
        body: { userData },
      }),
    }),

    // Create Course
    createCourse: builder.mutation<Icourse, Icourse>({
      query: (useData) => ({
        url: "/api/v1/course/createCourse",
        method: "POST",
        body: useData,
      }),
    }),

    // Brought Courses
    broughtCourses: builder.query<IcourseData, string>({
      query: () => "/api/v1/course/broughtCourses",
    }),

    // Purchease course
    purchaseCourse: builder.mutation<IcourseDataOne, string>({
      query: (userData) => ({
        url: `/api/v1/course/purcheaseCourse/${userData}`,
        method: "POST",
      }),
    }),

    // Get purchase courses
    getPurchaseCourse: builder.query<getPurchaseCourseResponse, string>({
      query: () => "/api/v1/course/getPurcheaseCourse",
    }),
  }),
});

export const {
  useGetCourseDataQuery,
  useGetOneCourseMutation,
  useBuyCourseMutation,
  useCreateCourseMutation,
  useBroughtCoursesQuery,
  usePurchaseCourseMutation,
  useGetPurchaseCourseQuery,
} = courseAPI;
