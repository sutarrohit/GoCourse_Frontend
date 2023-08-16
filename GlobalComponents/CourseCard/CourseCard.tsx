import React from "react";
import Style from "./CourseCard.module.css";
import Image from "next/image";
import python from "../Images/python.jpg";
import RatingStar from "./RatingStar/RatingStar";
import Link from "next/link";
import { IcourseData, CourseListProps } from "@/Interfaces/Interfaces";
import { useRouter } from "next/router";
import { RootState } from "@/api/app/store";
import { useSelector } from "react-redux";
import { useGetPurchaseCourseQuery } from "@/api/services/courseAPI";

const CourseCard: React.FC<CourseListProps> = (data) => {
  const router = useRouter();
  const isAuthenticate = useSelector((state: RootState) => state.userAuth.isAuthenticated);

  const { data: courseData, error: courseError, isLoading: courseIsLoading } = useGetPurchaseCourseQuery("");

  const purchasedCourse = courseData?.coures;

  return (
    <div className={Style.courseCard}>
      <div className={Style.courseCard_container}>
        {/* Card components */}

        <div className={Style.card}>
          {data?.data?.courses?.map((element, index) => {
            return (
              <div className={Style.cardComponent} key={index}>
                <Image src={element.image || ""} alt="card" width={300} height={300} />
                <div className={Style.cardComponent_info}>
                  <h5 className={Style.title}>{element?.title}</h5>
                  <p className={Style.description}> {element?.description}</p>
                  <div className={Style.star}>
                    <RatingStar rating={element.rating || 0} />
                  </div>
                  <div className={Style.btnBuy}>
                    {isAuthenticate ? (
                      <>
                        {purchasedCourse && purchasedCourse?.includes(element._id || "") ? (
                          <>
                            <Link href={`/liveCourse/${element?._id}`}>
                              <button>Resume Learning</button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link href={`/courseDetail/${element?._id}`}>
                              <button>Buy Course</button>
                            </Link>
                          </>
                        )}
                      </>
                    ) : (
                      <Link href={"/login"}>
                        <button>Buy Course</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
