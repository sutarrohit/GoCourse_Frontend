import React, { useState } from "react";
import { Hero, CourseCard, Footer, TopCourses, Header, Siderbar } from "@/GlobalComponents";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";

const index = () => {
  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);

  return (
    <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
      <Siderbar />
      <Header />
      <Hero />
      <TopCourses />
      <Footer />
    </div>
  );
};

export default index;
