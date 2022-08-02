import React, { useEffect, useRef } from "react";
import "./UpdateProfile.css";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import {
  ClearErrors,
  loadUser,
  UpdateProfileData,
} from "../../Actions/UserAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadInput = useRef(null);
  const { loading, isUpdated, error } = useSelector((state) => state.Profile);
  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    if (error) {
      toast.error(error);
      console.log(error);
      dispatch(ClearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully!!");

      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: "UpdateProfileReset" });
    }
  }, [isUpdated, dispatch, navigate, error]);

  return (
    <div className="LoginRegisterForm">
      <div className="LoginRegisterFormContainer">
        <h1 className="myform-heading">Update Profile</h1>
        <div className="myform">
          <Formik
            className="w-full"
            initialValues={{
              email: user && user.email,
              name: user && user.name,
              avatar: "",
              preview_avatar: user && user.avatar.url,
            }}
            onSubmit={(values) => {
              const myForm = new FormData();

              myForm.set("name", values.name);
              myForm.set("email", values.email);
              myForm.set("avatar", values.avatar);

              dispatch(UpdateProfileData(myForm));
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className=" mb-10 w-full flex flex-col justify-between items-center">
                <div className="form-input">
                  <SentimentSatisfiedAltIcon />
                  <Field type="text" name="name" placeholder="Username" />
                </div>

                <div className="form-input">
                  <EmailIcon />
                  <Field type="email" name="email" placeholder="Email" />
                </div>

                <div className="form-input" id="registerImage">
                  {values.avatar ? (
                    <img
                      src={values.avatar}
                      className="avatar-preview"
                      alt={values.name}
                    />
                  ) : (
                    <img
                      src={values.preview_avatar}
                      className="avatar-preview"
                      alt={values.name}
                    />
                  )}
                  <input
                    hidden
                    type="file"
                    ref={uploadInput}
                    onChange={(event) => {
                      const reader = new FileReader();

                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setFieldValue("avatar", reader.result);
                        }
                      };
                      reader.readAsDataURL(event.target.files[0]);
                      setFieldValue("avatar", event.target.files[0]);
                    }}
                  />
                  <button
                    type="button"
                    className="btn upload-btn bg-orange-600 text-white hover:bg-orange-700"
                    onClick={() => {
                      uploadInput.current.click();
                    }}
                  >
                    Upload Avatar
                  </button>
                </div>

                <input
                  type="submit"
                  className="btn login-btn bg-yellow-500 text-black hover:bg-yellow-400"
                  disabled={loading}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
