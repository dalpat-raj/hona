import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ rating }: any) => {
  const star = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(<AiFillStar key={i} color="#FDBC00" size={18}/>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(<BsStarHalf key={i} color="#FDBC00" size={18}/>);
    } else {
      star.push(<AiOutlineStar key={i} color="#FDBC00" size={18}/>);
    }
  }

  return <div style={{display: "flex"}}>{star}</div>;
};

export default Rating;
