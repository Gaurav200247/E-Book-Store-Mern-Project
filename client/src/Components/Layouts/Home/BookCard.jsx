import React from "react";
import Rating from "@mui/material/Rating";
import "./BookCard.css";
import { Link } from "react-router-dom";

const BookCard = ({ _id, images, title, rating, price }) => {
  const ShowAddBtn = (e) => {
    e.currentTarget.querySelector("button").classList.add("show-add-btn");
  };

  const HideAddBtn = (e) => {
    e.currentTarget.querySelector("button").classList.remove("show-add-btn");
  };

  return (
    <div
      className="BookCard"
      onMouseEnter={ShowAddBtn}
      onMouseLeave={HideAddBtn}
    >
      <Link to={`/books/${_id}`} className="bc-img-container">
        <img src={images[0].url} alt={title} />
      </Link>
      <div className="bc-info-container">
        <p className="title truncate mb-2">{title}</p>
        <p className="rentPrice truncate mb-2">₹ {price}</p>
        <Rating
          value={rating}
          readOnly
          precision={0.5}
          size={window.innerWidth < 900 ? "small" : "medium"}
        />
      </div>
      <button className="add-btn truncate">Add To My Library</button>
    </div>
  );
};

export default BookCard;
