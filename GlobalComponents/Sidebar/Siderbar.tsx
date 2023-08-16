import React from "react";
import Style from "./Siderbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/api/app/store";
import { logoutAuth } from "../../api/feature/authSlice";
import Toggle from "../Header/Toggle/Toggle";
import { changeOpenSiderbarMenu } from "../../api/feature/stateVariable";
import dynamic from "next/dynamic";
import { BsCartCheck } from "react-icons/bs";
import { useRouter } from "next/router";

const Siderbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );
  const openSiderbarMenu = useSelector(
    (state: RootState) => state.stateVariable.openSiderbarMenu
  );

  const router = useRouter();
  const userLogout = () => {
    dispatch(logoutAuth());
  };

  const handleMyLearning = () => {
    router.push("/myLearning");
  };
  return (
    <div
      className={
        openSiderbarMenu
          ? `${Style.sidebar} ${Style.sliderMenuOpen}`
          : `${Style.sidebar} ${Style.sliderMenuClose} `
      }
    >
      <div className={Style.sidebar_container}>
        <div className={Style.sidebar_toggle}>
          <h1>GoCourse</h1>
          <Toggle />
        </div>

        <div className={Style.sidebar_navigation}>
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>About</Link>
        </div>

        <div className={Style.sidebar_button}>
          {isAuthenticated ? (
            <>
              <div
                className={Style.cart}
                onClick={() => {
                  return handleMyLearning(), dispatch(changeOpenSiderbarMenu());
                }}
              >
                <BsCartCheck />
              </div>
              <button
                onClick={() => {
                  return userLogout(), dispatch(changeOpenSiderbarMenu());
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                onClick={() => dispatch(changeOpenSiderbarMenu())}
              >
                Log in
              </Link>
              <Link
                href={"/signup"}
                onClick={() => dispatch(changeOpenSiderbarMenu())}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// export default Siderbar;
export default dynamic(() => Promise.resolve(Siderbar), { ssr: false });
