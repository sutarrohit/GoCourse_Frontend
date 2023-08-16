import React, { useState } from "react";
import Style from "./resetPassword.module.css";
import { useRouter } from "next/router";
import { Loader, Header, Footer, Siderbar } from "@/GlobalComponents";
import { useResetPasswordMutation } from "../../api/services/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";

const resetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);

  const router = useRouter();
  const token = router.query.resetPassword?.toString() || "";
  const [resetPassword, { data, error, isLoading }] = useResetPasswordMutation();

  const handleReset = async () => {
    const response = await resetPassword({ password, confirmPassword, token });

    if ("data" in response) {
      const message = response.data.message;

      if (message) {
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    }
  };

  return (
    <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
      <Header />
      <Siderbar />
      <div className={Style.notification}>
        {error && <h5>Error, Please enter correct password.</h5>}
        {data && <h5 className={Style.success}>Your password reset has been completed successfully.</h5>}
      </div>
      <div className={Style.verification}>
        {isLoading && <Loader />}
        <div className={Style.verification_container}>
          <h3>Click to reset your password</h3>

          <div className={Style.password_box}>
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
                placeholder="Enter your confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button onClick={() => handleReset()}>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default resetPassword;
