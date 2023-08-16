import React from "react";
import Style from "./verification.module.css";
import { useRouter } from "next/router";
import { Loader, Header, Footer, Siderbar } from "@/GlobalComponents";
import { useSignupVerificationMutation } from "../../api/services/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/api/app/store";

const verification = () => {
  const router = useRouter();
  const token = router.query.verification?.toString() || "";
  const [signupVerification, { data, error, isLoading }] = useSignupVerificationMutation();

  const themeMode = useSelector((state: RootState) => state.stateVariable.themeMode);

  const handleVerify = async () => {
    const response = await signupVerification(token);

    if ("data" in response) {
      const message = response.data.message;
      const status = response.data.status;

      if (message) {
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    }
  };

  return (
    <div className={`${themeMode ? "darkMode" : "lightMode"}`}>
      <Siderbar />
      <Header />
      <div className={Style.notification}>
        {error && <h5>Token is invalid or expired</h5>}
        {data && <h5 className={Style.success}>Your account has been successfully verified.</h5>}
      </div>
      <div className={Style.verification}>
        {isLoading && <Loader />}
        <div className={Style.verification_container}>
          <h3>Click to verifiy your email address</h3>
          <button onClick={() => handleVerify()}>Verify</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default verification;
