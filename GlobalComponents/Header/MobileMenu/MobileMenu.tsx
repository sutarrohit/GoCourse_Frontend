import React from "react";
import Style from "./MobileMenu.module.css";
import { useDispatch } from "react-redux";
import { changeOpenSiderbarMenu } from "../../../api/feature/stateVariable";

const MobileMenu = () => {
  const dispatch = useDispatch();

  const handleChangeOpenSiderbarMenu = () => {
    dispatch(changeOpenSiderbarMenu());
  };
  return (
    <div>
      <input type="checkbox" id={Style.checkbox} />
      <label htmlFor={Style.checkbox} className={Style.toggle} onClick={() => handleChangeOpenSiderbarMenu()}>
        <div className={Style.bars} id={Style.bar1}></div>
        <div className={Style.bars} id={Style.bar2}></div>
        <div className={Style.bars} id={Style.bar3}></div>
      </label>
    </div>
  );
};

export default MobileMenu;
