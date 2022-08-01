import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { AiOutlineRight } from "react-icons/ai";
import GoogleMapReact from "google-map-react";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
  const defaultProps = {
    center: {
      lat: 28.56136,
      lng: 77.21194,
    },
    zoom: 11,
  };

  return (
    <div className="Contact">
      <div className="route-container" id="up">
        <Link to="/">
          Home <AiOutlineRight />
        </Link>
        <Link to="/contact">
          Contact <AiOutlineRight />
        </Link>
      </div>

      <div style={{ height: "70vh", width: "80%" }}>
        Will Add Map Here Later.....
      </div>
    </div>
  );
};

export default Contact;
