import React from "react";
import "./Footer.css";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsDiscord, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links-container">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-social-links-container">
        <a
          href="https://www.instagram.com/gaurav_op_22/"
          className="social-media-btn mb-2 text-fuchsia-600"
        >
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/gaurav-gupta-b14482231/"
          className="social-media-btn mb-2 text-sky-500"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://discordapp.com/users/Gaurav%20Gupta#2647"
          className="social-media-btn mb-2 text-blue-700"
        >
          <BsDiscord />
        </a>
      </div>

      <div className="footer-info">
        <p>copyrights 2022 &copy; Gaurav Gupta</p>
      </div>
    </footer>
  );
};

export default Footer;
