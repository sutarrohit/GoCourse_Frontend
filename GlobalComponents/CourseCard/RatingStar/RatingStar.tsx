import React from "react";
import Image from "next/image";
import Style from "./RatingStar.module.css";

interface CourseCardProps {
  rating: number;
}

const RatingStar: React.FC<CourseCardProps> = ({ rating }) => {
  return (
    <div className={Style.rating}>
      {rating >= 0 && rating <= 1.5 ? (
        <p>★☆☆☆☆</p>
      ) : rating >= 1.6 && rating <= 2.5 ? (
        <p>★★☆☆☆</p>
      ) : rating >= 2.6 && rating <= 3.5 ? (
        <p>★★★☆☆</p>
      ) : rating >= 3.6 && rating <= 4.5 ? (
        <p>★★★★☆</p>
      ) : rating >= 4.5 ? (
        <p>★★★★★</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default RatingStar;
