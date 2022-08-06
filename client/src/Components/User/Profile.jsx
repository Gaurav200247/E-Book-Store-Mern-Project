import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { GrEdit } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import { logOutUser } from "../../Actions/UserAction";
import Loading from "../Layouts/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../../Images/Profile.png";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.User);

  const LogOutHandler = () => {
    dispatch(logOutUser());
    toast.success("Logged Out SuccessFully");
    navigate("/login");
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="log-out-btn-block">
        <button onClick={LogOutHandler}>
          Log Out <AiOutlineLogout className="ml-5 font-bold" />
        </button>
      </div>
      <div className="Profile">
        <div className="user-img-container">
          <img
            src={
              user &&
              (user.avatar.url === "This is Sample url"
                ? ProfileIcon
                : user.avatar.url)
            }
            alt={user && user.name}
          />
          <Link to="/account/update" className="profile-edit-btn">
            <GrEdit />
          </Link>
        </div>
        <div className="user-info-container">
          <h1>{user && user.name}</h1>
          <p className="text-slate-600">{user && user.email}</p>
          <p className="mt-10">
            <span className="mr-2">Joined On : </span>{" "}
            {String(user && (user.createdAt || "none")).substr(0, 10)}
          </p>

          <div className="user-main-info-head">
            <Link to="/account/favs" className="user-favs">
              <h1>Favourites</h1>
              <FavoriteIcon />
            </Link>
            <Link to="/password/update" className="user-settings">
              <h1>Change Password</h1>
              <SettingsIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
