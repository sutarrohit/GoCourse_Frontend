import React from "react";
import Style from "./TopCourses.module.css";
import { CourseCard } from "../index";
import { useGetCourseDataQuery } from "../../api/services/courseAPI";
import { Loader } from "../index";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";

const TopCourses = () => {
  const { data, error, isLoading } = useGetCourseDataQuery("");

  return (
    <div className={Style.TopCourses}>
      <div className={Style.kiratCourses}>
        <h1>Courses by Harkirat</h1>
      </div>

      <div className={Style.topCourses}>
        {error && (
          <div className={Style.notification}>
            <h4>Unable to fetch course data</h4>
          </div>
        )}
        {isLoading && (
          <div className={Style.notification}>
            <Loader />
          </div>
        )}
        {!isLoading && <CourseCard data={data} />}
      </div>
    </div>
  );
};

export default TopCourses;
