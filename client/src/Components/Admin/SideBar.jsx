import React from "react";
import Logo from "../Layouts/Header/Logo";
import "./SideBar.css";
import { ImBooks } from "react-icons/im";
import { VscNewFolder } from "react-icons/vsc";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="logo-container">
        <Logo />
      </div>

      <div className="admin-dashboard-container">
        <h1>Dashboard</h1>
        <ul>
          <Link to="/admin/dashboard">
            <MdDashboard /> Dashboard
          </Link>
        </ul>
      </div>

      <div className="admin-books-container">
        <h1>Books</h1>
        <ul>
          <Link to="/admin/book">
            <ImBooks /> All Books
          </Link>
          <Link to="/admin/book/new">
            <VscNewFolder /> New Book
          </Link>
          <Link to="/admin/book/update">
            <GrDocumentUpdate /> Update Book
          </Link>
        </ul>
      </div>

      <div className="admin-users-container">
        <h1>Users</h1>
        <ul>
          <Link to="/admin/users">
            <FaUserFriends /> All Users
          </Link>
          <Link to="/admin/users/update">
            <FiUserPlus /> Update User
          </Link>
        </ul>
      </div>

      <div className="theme-container">
        <h1>Themes</h1>
        <div>
          <span className="theme-block bg-slate-800"></span>
          <span className="theme-block bg-white"></span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
