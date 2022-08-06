import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import ProfileIcon from "../../Images/Profile.png";
import "./ReviewCard.css";

const ReviewCard = ({ name, comment, ratings, avatar }) => {
  const options = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
    size: window.innerWidth < 900 ? "small" : "medium",
  };

  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div className="review-card">
      <div>
        <img src={ProfileIcon} alt="User" />
        <p>{name}</p>
      </div>

      <div>
        <Rating {...options} />
        <span className="review-card-comment">
          {isReadMore ? comment : `${comment.substring(0, 150)}`}

          {comment.length > 100 && (
            <span
              className="ReadMoreBtn ml-2 text-blue-600 cursor-pointer"
              onClick={() => setIsReadMore(!isReadMore)}
            >
              {isReadMore ? "Show Less" : "Read More"}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
