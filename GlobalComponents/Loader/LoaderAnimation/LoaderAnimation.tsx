import React from "react";
import Style from "./LoaderAnimation.module.css";

const LoaderAnimation = () => {
  return (
    <div className={Style.LoaderAnimation}>
      <div className={Style.loader}></div>
    </div>
  );
};

export default LoaderAnimation;
