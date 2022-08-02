import React, { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import { Link, useLocation } from "react-router-dom";
import { GiSchoolBag } from "react-icons/gi";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";

import "./header.css";

const Header = () => {
  const [navToggle, setnavToggle] = useState(false);
  const [Navcolor, setNavcolor] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.User);

  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    setTimeout(() => {
      setnavToggle(false);
    }, 5000);
  }, [navToggle]);

  const changeColor = () => {
    if (window.scrollY >= 300) {
      setNavcolor(true);
    } else {
      setNavcolor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <nav>
      <div
        className={`upper-nav ${Navcolor && "nav-color"} ${
          location.pathname === "/" ? null : "nav-color"
        }`}
      >
        <div className="nav-logo-container">
          <Logo />
        </div>

        <div className="nav-links-container">
          <Link to="/">Home</Link>
          <Link to="/library">Library</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-icons-container">
          <Link to="/search">
            <AiOutlineSearch />
          </Link>
          <Link to="/library/bag">
            <GiSchoolBag />
          </Link>
          <Link to="/login">
            {isAuthenticated ? (
              <img
                src={user && user.avatar && user.avatar.url}
                alt={user && user.name}
                className="header-avatar-icon"
              />
            ) : (
              <FaUserCircle />
            )}
          </Link>
        </div>

        <div className="toggle-btn-container">
          <FaBars onClick={() => setnavToggle(!navToggle)} />
          {navToggle && (
            <div className="toggle-block">
              <div className="toggled-nav-links-container">
                <div className="tri-block"></div>
                <Link to="/">Home</Link>
                <Link to="/library">Library</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <button className={`ScrollToTopBtn ${Navcolor && "show-scroller"}`}>
        <AiOutlineArrowUp
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        />
      </button>
    </nav>
  );
};

export default Header;
