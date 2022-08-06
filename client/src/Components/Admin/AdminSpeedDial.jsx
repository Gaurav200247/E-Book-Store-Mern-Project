import React, { useState } from "react";
import "./Dashboard.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

const AdminSpeedDial = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  const dashBoard = () => {
    navigate("/admin/dashboard");
  };
  const account = () => {
    navigate("/account");
  };
  const LogOutUser = () => {
    navigate("/");
    dispatch(logOutUser());
  };

  const Options = [
    { icon: <ExitToAppIcon />, name: "LogOut", func: LogOutUser },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <DashboardIcon />, name: "Dashboard", func: dashBoard },
  ];

  return (
    <div>
      <Backdrop open={open} style={{ zIndex: "0" }} />
      <SpeedDial
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        ariaLabel="SpeedDial basic example"
        FabProps={{
          sx: {
            bgcolor: "success.main",
            "&:hover": {
              bgcolor: "secondary.main",
            },
          },
        }}
        sx={{ position: "fixed", bottom: 16, left: 16 }}
        icon={
          <img
            className="speedDialIcon"
            src={
              user &&
              user.avatar &&
              (user.avatar.url === "profilePicUrl" ? (
                <SpeedDialIcon />
              ) : (
                user.avatar.url
              ))
            }
            alt="user"
          />
        }
      >
        {Options.map((item, index) => {
          return (
            <SpeedDialAction
              key={index}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          );
        })}
      </SpeedDial>
    </div>
  );
};

export default AdminSpeedDial;
