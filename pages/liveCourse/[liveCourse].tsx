/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import Style from "./liveCourse.module.css";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useGetOneCourseMutation, usePurchaseCourseMutation } from "../../api/services/courseAPI";
import dynamic from "next/dynamic";
import { Loader, Header, Footer, Siderbar } from "@/GlobalComponents";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";

const liveCourse = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const userId = useSelector((state: RootState) => state.userAuth._id);
  if (!isAuthenticated) router.push("/");
  const courseId = router.query.liveCourse?.toString() || "";

  const [purchaseCourse, { data: purchaseData, error: purchaseError, isLoading: purchaseIsLoading }] =
    usePurchaseCourseMutation();

  const confirmPurchase = async () => {
    await purchaseCourse(courseId);
  };

  const [getOneCourse, { data, error, isLoading }] = useGetOneCourseMutation();
  const handleCourseData = async () => {
    const response = await getOneCourse(courseId);
  };

  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);

  useEffect(() => {
    handleCourseData();
    confirmPurchase();
  }, [courseId]);
  return (
    <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
      <Siderbar />
      <Header />
      <div className={Style.liveCourse}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={Style.liveCourse_container}>
            <div className={Style.player}>
              <div className={Style.player_liveVideo}>
                <ReactPlayer url={data?.course?.videoLink} controls={true} width="100%" height="100%" />
              </div>
              <h4>{data?.course?.title}</h4>
              <h5>Instructor : {data?.course?.instructor}</h5>
              <p>
                Harkirat Singh is a full-stack developer with four years of professional experience. He has a background
                in working at an Investment Bank for a year and later transitioned to running a WebRTC consultancy.
                Harkirat's expertise lies in building scalable platforms and leveraging real-time communication
                technologies
              </p>
            </div>

            <div className={Style.player_info}>
              <div className={Style.course_about}>
                <h4>About this course</h4>
                <p>{data?.course?.description}</p>
              </div>
              <div className={Style.course_content}>
                <h4>Course Content</h4>

                <div className={Style.course_content_block}>
                  {data?.course?.courseContent?.map((element, key) => {
                    return <p key={key}>{element}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// export default liveCourse;

export default dynamic(() => Promise.resolve(liveCourse), { ssr: false });
