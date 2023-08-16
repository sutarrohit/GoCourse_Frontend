import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Style from "../styles/login.module.css";
import Illustrations from "../GlobalComponents/Images/353.svg";
import { useLoginUserMutation } from "../api/services/userAPI";
import { loginAuth } from "../api/feature/authSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../api/app/store";
import { Loader, Header, Footer, Siderbar } from "../GlobalComponents/index";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);
  if (isAuthenticated) router.push("/");

  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();

  const handleLogin = async () => {
    const response = await loginUser({ email, password });

    if ("data" in response) {
      const userId = response.data;

      if (userId) {
        dispatch(loginAuth(userId));
        router.push("/");
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
          <div className={Style.error}>{error && <h5>Login Error, Please provide correct email and password</h5>}</div>
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
                  <h1>Login</h1>

                  <div className={Style.email}>
                    <label htmlFor="email">Email Id</label>
                    <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
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

                  <div className={Style.btnLogin}>
                    <button onClick={() => handleLogin()}>Login</button>
                    <Link href={"/forgotPassword"}>Forgot Password?</Link>
                  </div>

                  <div className={Style.btnLogin}>
                    <Link href={"signup"}>
                      <button>Create an account</button>
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

export default login;
