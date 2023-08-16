import React from "react";
import Style from "./Loader.module.css";
import LoaderAnimation from "./LoaderAnimation/LoaderAnimation";

const Loader = () => {
  return (
    <div className={Style.loader}>
      <div className={Style.loader_container}>
        <LoaderAnimation />
      </div>
    </div>
  );
};

export default Loader;
