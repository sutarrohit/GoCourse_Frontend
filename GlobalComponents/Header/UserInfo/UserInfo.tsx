import React from "react";
import Style from "./UserInfo.module.css";
import { RxAvatar } from "react-icons/rx";
import { logoutAuth } from "../../../api/feature/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/api/app/store";

const UserInfo = () => {
  const role = useSelector((state: RootState) => state.userAuth.role);
  const userName = useSelector((state: RootState) => state.userAuth.userName);
  const router = useRouter();
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logoutAuth());
  };

  const createCourse = () => {
    if (typeof window !== "undefined") {
      router.push("/createCourse");
    }
  };

  return (
    <div className={Style.userInfo}>
      <div className={Style.avatar}>
        <RxAvatar />
        <p>
          Welcome
          <br />
          <span>{!userName ? "User" : userName}</span>
          <br /> Hope you have
          <br /> amazing exprience
        </p>
        {role === "admin" ? <button onClick={() => createCourse()}>Create Course</button> : ""}
        <button onClick={() => userLogout()}>Log out</button>
      </div>
    </div>
  );
};

export default UserInfo;
