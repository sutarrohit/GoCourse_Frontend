import React, { useState } from "react";
import Link from "next/link";
import Style from "../styles/createCourse.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../api/app/store";
import { Header, Footer, Siderbar, Loader } from "../GlobalComponents/index";
import { useCreateCourseMutation } from "@/api/services/courseAPI";

const createCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImageLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [courseContentData, setCourseContentData] = useState("");

  const disptach = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const role = useSelector((state: RootState) => state.userAuth.role);
  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);
  const router = useRouter();

  const [createCourse, { data, error, isLoading }] = useCreateCourseMutation();

  const getCourseContent = () => {
    const data = courseContentData.split(",");

    return data;
  };

  const handleCreateCourse = async () => {
    const courseData = {
      title: title,
      description: description,
      instructor: instructor,
      duration: Number(duration),
      price: Number(price),
      language: language,
      image: image,
      videoLink: videoLink,
      rating: 4,
      published: true,
      courseContent: getCourseContent(),
    };
    const response = await createCourse(courseData);
  };

  if (typeof window !== "undefined") {
    if (!isAuthenticated || role !== "admin") router.push("/");
  }

  return (
    <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
      <Siderbar />
      <Header />
      <div className={Style.notification}>
        {error && <h5>Error, Please upload correct data</h5>}
        {data && <h4>Congratulation! Course created succssfully</h4>}
      </div>
      <div className={Style.CreateCourse}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={Style.CreateCourse_holder}>
            <h2>Add new course</h2>
            <div className={Style.CreateCourse_container}>
              {/* Left */}
              <div className={Style.CreateCourse_left}>
                <div className={Style.content}>
                  <label>Title</label>
                  <input type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className={Style.content}>
                  <label>Description</label>
                  <input type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={Style.content}>
                  <label>Instructor</label>
                  <input type="text" placeholder="Enter Instructor" onChange={(e) => setInstructor(e.target.value)} />
                </div>
                <div className={Style.content}>
                  <label>Duration</label>
                  <input type="text" placeholder="Enter Duration" onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div className={Style.content}>
                  <label>Price</label>
                  <input type="text" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              {/* Right */}
              <div className={Style.CreateCourse_right}>
                <div className={Style.content}>
                  <label>language</label>
                  <input type="text" placeholder="Enter language" onChange={(e) => setLanguage(e.target.value)} />
                </div>
                <div className={Style.content}>
                  <label>Image</label>
                  <input type="text" placeholder="Enter Image Link" onChange={(e) => setImageLink(e.target.value)} />
                </div>
                <div className={Style.content}>
                  <label>Video</label>
                  <input type="text" placeholder="Enter Video Link" onChange={(e) => setVideoLink(e.target.value)} />
                </div>
                <div className={Style.content}>
                  <label>Content</label>
                  <textarea
                    placeholder="Enter Content seprated by comma"
                    onChange={(e) => setCourseContentData(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => handleCreateCourse()}>Submit</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default createCourse;
