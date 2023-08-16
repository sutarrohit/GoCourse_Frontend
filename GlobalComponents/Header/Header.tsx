import React, { useState } from "react";
import Link from "next/link";
import Style from "./Header.module.css";
import Toggle from "./Toggle/Toggle";
import MobileMenu from "./MobileMenu/MobileMenu";
import { RxAvatar } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/api/app/store";
import UserInfo from "./UserInfo/UserInfo";
import dynamic from "next/dynamic";
import { BsCartCheck } from "react-icons/bs";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [opneUserMenu, setOpenUserMenu] = useState(false);
  const isAuthenticate = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const OpenSiderbarMenu = useSelector((state: RootState) => state.stateVariable.openSiderbarMenu);

  const router = useRouter();

  const handleMyLearning = () => {
    router.push("/myLearning");
  };

  return (
    <div className={Style.header}>
      <div className={Style.header_container}>
        {/* Left Side */}
        <div className={Style.header_left}>
          <Link href={"/"}>
            <h1>GoCourse</h1>
          </Link>
        </div>

        {/* Center */}
        <div className={Style.header_center}>
          {/* <Link href={"/"}>Home</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>About</Link> */}
          <input type="search" placeholder="Search" />
          <FiSearch />
        </div>

        {/* Right Side */}

        <div className={Style.header_right}>
          {isAuthenticate ? (
            <>
              <div className={Style.cart} onClick={handleMyLearning}>
                <BsCartCheck />
              </div>
              <div className={Style.userdata}>
                <RxAvatar onClick={() => setOpenUserMenu(!opneUserMenu)} />

                {opneUserMenu && <UserInfo />}
              </div>
            </>
          ) : (
            <div className={Style.header_button}>
              <Link href={"/login"}>
                <button>Log in</button>
              </Link>
              <Link href={"/signup"}>
                <button>Sign up</button>
              </Link>
            </div>
          )}

          {/* Loader */}
          <div className={Style.loader}>
            <Toggle />
          </div>

          <div className={Style.mobileMenu}>
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Header;
export default dynamic(() => Promise.resolve(Header), { ssr: false });
