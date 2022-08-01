import React, { useEffect } from "react";
import "./LoginRegisterForm.css";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import ForgotPassForm from "./ForgotPassForm.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors } from "../../Actions/UserAction";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const LoginRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const location = useLocation();
  // console.log(location);

  const { error, isAuthenticated } = useSelector((state) => state.User);

  const [formType, setFormType] = useState("login");

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error === "Please Login to Access this Route...") {
      dispatch(ClearErrors());
    }
    if (error && error !== "Please Login to Access this Route...") {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [error, toast, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="LoginRegisterForm">
        <div className="LoginRegisterFormContainer">
          <div className="form-heading">
            <span
              onClick={() => setFormType("register")}
              className={`${formType === "register" && "under-line"}`}
            >
              Register
            </span>
            <span
              onClick={() => setFormType("login")}
              className={`${formType === "login" && "under-line"}`}
            >
              Login
            </span>
          </div>
          {formType === "login" && <LoginForm />}
          {formType === "register" && <RegisterForm />}
          {formType === "forgotPass" && <ForgotPassForm />}
        </div>
      </div>
    </>
  );
};

export default LoginRegisterForm;
