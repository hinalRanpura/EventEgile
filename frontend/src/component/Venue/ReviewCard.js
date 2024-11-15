import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePng from "../../assets/h1.jpg"

import ReactStars from "react-rating-stars-component";
const  ReviewCard = ({review}) => {
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value : review.rating,
        isHalf:true,
    };
  return (
    <>
      <div className="reviewCard">
        <img src={profilePng} alt="user"/>
        <p>{review.name}</p>
        <ReactStars {...options} />
        <p>{review.comment}</p>
      </div>
    </>
  );
}

export default ReviewCard;
