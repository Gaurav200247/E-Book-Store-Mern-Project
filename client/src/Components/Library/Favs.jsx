import React, { useEffect, useState } from "react";
import "./Favs.css";
import BookCard from "../Layouts/Home/BookCard";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

const Favs = () => {
  const [favList, setfavList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favList")) {
      setfavList(JSON.parse(localStorage.getItem("favList")));
    }
  }, []);

  return (
    <div className="favs-container">
      <div>
        <div className="route-container" id="up">
          <Link to="/account">
            My Account <AiOutlineRight />
          </Link>
          <Link to="/account/favs">
            Favourites <AiOutlineRight />
          </Link>
        </div>
      </div>

      <div>
        <h1>
          {favList.length === 0
            ? "Your Favourites List is Empty !!"
            : "My Favourites List"}
        </h1>

        <div className="container">
          {favList.length > 0 &&
            favList.map((item) => {
              return <BookCard key={item._id} {...item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Favs;
