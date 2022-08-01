import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, forgotPassword } from "../../Actions/UserAction";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading/Loading";

const ForgotPassForm = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.forgotPass);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [toast, dispatch, error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [toast, dispatch, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="LoginRegisterForm">
          <div className="LoginRegisterFormContainer">
            <h1 className="myform-heading">Forgot Password ?</h1>
            <div className="myform">
              <Formik
                className="w-full"
                initialValues={{
                  email: "",
                }}
                onSubmit={(values) => {
                  const myform = new FormData();
                  myform.set("email", values.email);
                  dispatch(forgotPassword(myform));
                }}
              >
                <Form className=" mb-10 w-full flex flex-col justify-between items-center">
                  <div className="form-input">
                    <EmailIcon />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter E-Mail Here"
                    />
                  </div>

                  <Link
                    to="/login"
                    className="w-full mt-2 text-pink-700 text-right  underline"
                  >
                    Back to Login
                  </Link>

                  <input
                    type="submit"
                    className="btn login-btn bg-green-700 text-white hover:bg-green-600"
                  />
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassForm;
