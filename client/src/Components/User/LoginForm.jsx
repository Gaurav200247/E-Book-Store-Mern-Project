import React from "react";
import { Field, Form, Formik } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { loginUser } from "../../Actions/UserAction";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <div className="login-form">
      <Formik
        className="w-full"
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          dispatch(loginUser(values.email, values.password));
        }}
      >
        <Form className="mt-10 mb-10 w-full flex flex-col justify-between items-center">
          <div className="form-input">
            <EmailIcon />
            <Field type="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-input">
            <LockIcon />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <Link
            to="/password/forgot"
            className="w-full m-5 text-pink-700 text-right  duration-300 hover:underline"
          >
            Forgot Password ?
          </Link>

          <input
            type="submit"
            className="btn login-btn bg-blue-600 text-white hover:bg-blue-500"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
