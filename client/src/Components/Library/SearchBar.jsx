import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (title.trim()) {
      navigate(`/library?title=${title}`);
    } else {
      navigate(`/library`);
    }
    setTitle("");
  };

  return (
    <>
      <form className="searchBox" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Search Product ..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
};

export default SearchBar;
