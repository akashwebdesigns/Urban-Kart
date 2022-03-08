import Rating from '@material-ui/lab/Rating';
import React from "react";


const ReviewCard = ({ review }) => {

  return (
    <div className="reviewCard">
      <img src='https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png' alt="User" />
      <p>{review.name}</p>
      <Rating name="half-rating" defaultValue={review.rating} precision={0.5} readOnly />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;