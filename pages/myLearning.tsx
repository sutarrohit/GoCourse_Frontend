/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Style from "../styles/myLearning.module.css";
import { CourseCard, Loader, Header, Footer, Siderbar } from "../GlobalComponents/index";
import { useBroughtCoursesQuery, useGetCourseDataQuery } from "@/api/services/courseAPI";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../api/app/store";

const mylearning = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);

  if (typeof window !== "undefined") if (!isAuthenticated) router.push("/");

  const { data, error, isLoading } = useBroughtCoursesQuery("");

  return (
    <div className={`${Style.main} ${themeMode ? "darkMode" : "lightMode"}`}>
      <Siderbar />
      <Header />

      <div className={Style.heading}>
        <h1>My learning</h1>
      </div>

      <div className={Style.mylearning}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={Style.mylearning_Course}>
              {" "}
              {error ? <h4>You don't have any courses.</h4> : <CourseCard data={data} />}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default mylearning;
