import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearErrors,
  loadUser,
  UpdateProfilePassword,
} from "../../Actions/UserAction";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isUpdated, error } = useSelector((state) => state.Profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully!!");

      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: "UpdatePasswordReset" });
    }
  }, [isUpdated, dispatch, navigate, error]);

  return (
    <div className="LoginRegisterForm">
      <div className="LoginRegisterFormContainer">
        <h1 className="myform-heading">Change Password</h1>
        <div className="myform">
          <Formik
            className="w-full"
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              const myForm = new FormData();

              myForm.set("OldPassword", values.oldPassword);
              myForm.set("newPassword", values.newPassword);
              myForm.set("confirmPassword", values.confirmPassword);

              dispatch(UpdateProfilePassword(myForm));
            }}
          >
            <Form className=" mb-10 w-full flex flex-col justify-between items-center">
              <div className="form-input">
                <LockIcon />
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                />
              </div>

              <div className="form-input">
                <VpnKeyIcon />
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                />
              </div>

              <div className="form-input">
                <KeyIcon />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-Enter New Password"
                />
              </div>

              <input
                type="submit"
                className="btn login-btn bg-indigo-500 text-white hover:bg-indigo-400"
                disabled={loading}
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
