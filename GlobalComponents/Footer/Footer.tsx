import React from "react";
import Style from "./Footer.module.css";
import Link from "next/link";

import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_container}>
        <div className={Style.info}>
          <h2>GoCourse</h2>
          <p>
            Discover the power of knowledge with our diverse range of courses
            designed to transform your skills and open new doors in your
            journey.
          </p>
        </div>

        <div className={Style.navigate}>
          <h2>Navigate</h2>
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>About</Link>
        </div>

        <div className={Style.socials}>
          <h2>Socials</h2>

          <div className={Style.socialsIcon}>
            <Link href={"https://github.com/sutarrohit"} target="_blank">
              <AiOutlineGithub />
            </Link>
            <Link href={"https://twitter.com/imSrohitS"} target="_blank">
              {" "}
              <AiOutlineTwitter />
            </Link>
            <Link href={"/"}>
              {" "}
              <AiOutlineYoutube />
            </Link>
            <Link href={"/"}>
              <AiOutlineInstagram />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
