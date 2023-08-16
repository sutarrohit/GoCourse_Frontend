import React from "react";
import Style from "./Hero.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";
import dynamic from "next/dynamic";

import illustrationsImg from "../Images/138.svg";
import Link from "next/link";
const Hero = () => {
  const isAuthenticate = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );
  const name = useSelector((state: RootState) => state.userAuth.userName);
  return (
    <div className={Style.hero}>
      <div className={Style.hero_container}>
        {/* Left */}
        <div className={Style.left}>
          <h1>
            Unleash <span>boundless</span>
          </h1>
          <h1>
            <span>learning </span>potential
          </h1>

          <p>
            Discover the power of knowledge with our diverse range of courses
            designed to transform your skills and open new doors in your
            journey.
          </p>

          <div className={Style.left_button}>
            {isAuthenticate ? (
              <></>
            ) : (
              <>
                <Link href={"/login"}>
                  <button>Log in</button>
                </Link>
                <Link href={"/signup"}>
                  <button>Sign up</button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        <div className={Style.right}>
          <Image
            src={illustrationsImg}
            alt="illustrationsImg"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

//export default Hero
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
