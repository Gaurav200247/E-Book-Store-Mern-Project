import React from "react";
import { Field, Form, Formik } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/UserAction";

const RegisterForm = () => {
  const uploadInput = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.User);

  return (
    <div className="register-form">
      <Formik
        className="w-full"
        initialValues={{ name: "", email: "", password: "", avatar: "" }}
        onSubmit={(values) => {
          const myForm = new FormData();

          myForm.set("name", values.name);
          myForm.set("email", values.email);
          myForm.set("password", values.password);
          myForm.set("avatar", values.avatar);

          dispatch(registerUser(myForm));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="mt-10 mb-10 w-full flex flex-col justify-between items-center">
            <div className="form-input">
              <FaceIcon />
              <Field type="text" placeholder="Username" name="name" />
            </div>

            <div className="form-input">
              <EmailIcon />
              <Field type="email" placeholder="E-mail" name="email" />
            </div>

            <div className="form-input">
              <LockIcon />
              <Field type="password" placeholder="Password" name="password" />
            </div>

            <div className="form-input" id="registerImage">
              {values.avatar ? (
                <img
                  src={values.avatar}
                  className="avatar-preview"
                  alt={values.name}
                />
              ) : (
                <AccountCircleIcon />
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
                className="btn upload-btn bg-lime-600 text-white hover:bg-lime-700"
                onClick={() => {
                  uploadInput.current.click();
                }}
              >
                Upload Avatar
              </button>
            </div>

            <input
              type="submit"
              className="btn login-btn bg-green-600 text-white hover:bg-green-500"
              disabled={loading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
