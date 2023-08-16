import React, { useState } from "react";
import Illustrations from "../GlobalComponents/Images/353.svg";
import Image from "next/image";
import Style from "../styles/signup.module.css";
import Link from "next/link";
import { useSignupUserMutation } from "../api/services/userAPI";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";
import { Loader, Header, Footer, Siderbar } from "@/GlobalComponents";

const signup = () => {
  const isAuthenticate = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );
  const themeMode = useSelector(
    (state: RootState) => state.stateVariable.themeMode
  );
  const router = useRouter();

  if (isAuthenticate) router.push("/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signupUser, { data, error, isLoading }] = useSignupUserMutation();

  const handleSignup = async () => {
    const name = email.split("@")[0];

    const response = await signupUser({
      name,
      email,
      password,
      confirmPassword,
    });
    if ("data" in response) {
      const message = response.data.message;
      if (message) {
        setTimeout(() => {
          router.push("/");
        }, 10000);
      }
    }
  };

  return (
    <>
      {isAuthenticate ? (
        <></>
      ) : (
        <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
          <Siderbar />
          <Header />
          <div className={Style.error}>
            {error && (
              <h5>Signup Error, Please provide correct email and password</h5>
            )}
            {data && (
              <h5 className={Style.success}>
                Registration completed successfully, a verification email has
                been dispatched to your registered email address.
              </h5>
            )}
          </div>
          <div className={Style.login}>
            {isLoading && <Loader />}
            <div className={Style.login_container}>
              {/* Left */}
              <div className={Style.left}>
                <div className={Style.left_image}>
                  <Image
                    src={Illustrations}
                    alt="Illustrations"
                    priority={true}
                  />
                </div>
                <h1>GoCourse</h1>
                <p>
                  Discover the power of knowledge with our diverse range of
                  courses designed to transform your skills and open new doors
                  in your journey.
                </p>
              </div>
              {/* Right */}
              <div className={Style.right}>
                <div className={Style.loginCard}>
                  <h1>Sign Up</h1>

                  <div className={Style.email}>
                    <label htmlFor="email">Email Id</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className={Style.password}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={Style.password}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className={Style.password}>
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type="password"
                      className={Style.password}
                      placeholder="Enter your password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className={Style.btnLogin}>
                    <button onClick={() => handleSignup()}>Sign Up</button>
                  </div>

                  <div className={Style.btnLogin}>
                    <p>
                      Already a user? <Link href={"/login"}>Login</Link>
                    </p>
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

export default signup;
