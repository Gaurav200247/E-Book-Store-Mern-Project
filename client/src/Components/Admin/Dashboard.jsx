import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar";
import { FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SideBar />
      <div className="admin-info-block">
        <div className="horizontal-info-block">
          <div>
            <span>
              <h1>Users</h1> <p className="indicator">^ 5% </p>
            </span>
            <span>720</span>
            <Link to="/admin/users">See All Users</Link>
            <p className="svg-container bg-red-300 text-red-800">
              <FiUser />
            </p>
          </div>

          <div>
            <span>
              <h1>Orders</h1> <p className="indicator">^ 5% </p>
            </span>
            <span>1187</span>
            <Link to="/admin/users">See All Users</Link>
            <p className="svg-container bg-yellow-300 text-yellow-800">
              <AiOutlineShoppingCart />
            </p>
          </div>

          <div>
            <span>
              <h1>Earnings</h1> <p className="indicator">^ 5% </p>
            </span>
            <span>₹ 343888</span>
            <Link to="/admin/users">See All Users</Link>
            <p className="svg-container bg-green-300 text-green-800">
              <BsCurrencyDollar />
            </p>
          </div>
        </div>

        <div className="charts-block"></div>

        <div className="latest-orders-block"></div>
      </div>
    </div>
  );
};

export default Dashboard;
