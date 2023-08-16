import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Style from "../styles/forgotPassword.module.css";
import Illustrations from "../GlobalComponents/Images/353.svg";
import { useForgotPasswordMutation } from "../api/services/userAPI";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import type { RootState } from "../api/app/store";
import { Footer, Header, Loader, Siderbar } from "@/GlobalComponents";

const forgotPassword = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);
  if (isAuthenticated) router.push("/");

  const [forgotPassword, { data, error, isLoading }] = useForgotPasswordMutation();

  const handleLogin = async () => {
    const response = await forgotPassword({ email });

    if ("data" in response) {
      const message = response.data.message;

      if (message) {
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <> </>
      ) : (
        <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
          <Siderbar />
          <Header />
          <div className={Style.error}>{error && <h5>Error, Please provide correct email.</h5>}</div>
          {data && (
            <h5 className={Style.success}>
              Password reset link sent to your registered email, Please check your email.
            </h5>
          )}
          <div className={Style.login}>
            {isLoading && <Loader />}

            <div className={Style.login_container}>
              {/* Left */}
              <div className={Style.left}>
                <div className={Style.left_image}>
                  <Image src={Illustrations} alt="Illustrations" />
                </div>

                <h1>GoCourse</h1>
                <p>
                  Discover the power of knowledge with our diverse range of courses designed to transform your skills
                  and open new doors in your journey.
                </p>
              </div>
              {/* Right */}
              <div className={Style.right}>
                <div className={Style.loginCard}>
                  <h1>Forgot Password</h1>
                  <p className={Style.login_info}>
                    Enter your email and we will send you a link to reset your password
                  </p>

                  <div className={Style.email}>
                    <label htmlFor="email">Email Id</label>
                    <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className={Style.btnLogin}>
                    <button onClick={() => handleLogin()}>Submit</button>
                  </div>

                  <div className={Style.btnLogin}>
                    <Link href={"/login"}>
                      <button>Back to Login</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default forgotPassword;
