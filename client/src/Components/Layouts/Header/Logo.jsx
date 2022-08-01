import React from "react";
import { Link } from "react-router-dom";
import Logo_pic from "../../../Images/Logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/" className="logo-container">
      <div>
        <img src={Logo_pic} alt="logo" />
      </div>

      <div>
        <h1 className="truncate mb-1">E-Book Store</h1>
        <div></div>
        <h5 className="truncate mt-1">Take a look. Read a book!</h5>
      </div>
    </Link>
  );
};

export default Logo;
