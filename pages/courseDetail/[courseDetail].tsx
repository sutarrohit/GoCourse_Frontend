import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Style from "./courseDetail.module.css";
import {
  useGetOneCourseMutation,
  useBuyCourseMutation,
} from "../../api/services/courseAPI";
import { Loader, Header, Footer, Siderbar } from "@/GlobalComponents";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";

const courseDetail = () => {
  const router = useRouter();
  const courseId = router.query.courseDetail?.toString() || "";

  const isAuthenticated = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );
  if (typeof window !== "undefined") {
    if (!isAuthenticated) router.push("/");
  }
  const themeMode = useSelector(
    (state: RootState) => state.stateVariable.themeMode
  );

  const [getOneCourse, { data, error, isLoading }] = useGetOneCourseMutation();
  const handleCourseData = async () => {
    const response = await getOneCourse(courseId);
  };

  const [
    buyCourse,
    { data: paymentData, error: paymentError, isLoading: paymentIsLoading },
  ] = useBuyCourseMutation();

  const handlePayment = async () => {
    if (data) {
      const response = await buyCourse(data?.course?._id);

      if ("data" in response) {
        window.open(response.data.paymentUrl, "_blank");
      }
    }
  };

  useEffect(() => {
    handleCourseData();
  }, [courseId]);

  return (
    <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
      <Siderbar />
      <Header />
      <div className={Style.courseDetail}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={Style.courseDetail_container}>
            {/* left */}
            <div className={Style.left}>
              <div className={Style.infoCard}>
                <Image
                  src={data?.course?.image || ""}
                  alt="card"
                  width={300}
                  height={300}
                  unoptimized
                />
                <p>Price : {data?.course?.price} | 79% off</p>
                <p>Instructor : {data?.course?.instructor}</p>

                {/* <Link href={`/liveCourse/${data?.course?._id}`}>Buy this course</Link> */}
                <button onClick={() => handlePayment()}>Buy this course</button>
                {paymentIsLoading && <Loader />}

                <p>
                  30-Day Money-Back Guarantee <br /> Full Lifetime Access
                </p>

                <p>Share | Apply Coupon</p>
              </div>
            </div>
            {/* right */}
            <div className={Style.right}>
              <div className={Style.courseInfo}>
                <h1>{data?.course?.title}</h1>
                <h3>{data?.course?.description}</h3>
                <p>lectures : {data?.course?.duration}H total length</p>
                <p>Rating: {data?.course?.rating} out of 5 </p>
                <p>Language: {data?.course?.language}</p>

                <h4>This course includes:</h4>

                <div className={Style.courseMetadata}>
                  <p>42 hours on-demand video</p>
                  <p>5 coding exercises</p>
                  <p>39 articles</p>
                  <p>9 downloadable resources</p>
                  <p>Access on mobile and TV</p>
                  <p>Certificate of completion</p>
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

export default courseDetail;
