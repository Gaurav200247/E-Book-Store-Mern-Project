import React, { useEffect } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyIcon from "@mui/icons-material/Key";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, resetPassword } from "../../Actions/UserAction";
import Loading from "../Layouts/Loading/Loading";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { loading, error, success } = useSelector((state) => state.forgotPass);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully !!");

      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="LoginRegisterForm">
          <div className="LoginRegisterFormContainer">
            <h1 className="myform-heading">Reset Password ?</h1>
            <div className="myform">
              <Formik
                className="w-full"
                initialValues={{
                  resetPassword: "",
                  confirmPassword: "",
                }}
                onSubmit={(values) => {
                  const myForm = new FormData();

                  myForm.set("resetPassword", values.resetPassword);
                  myForm.set("confirmPassword", values.confirmPassword);

                  dispatch(resetPassword(myForm, token));
                }}
              >
                <Form className=" mb-10 w-full flex flex-col justify-between items-center">
                  <div className="form-input">
                    <VpnKeyIcon />
                    <Field
                      type="password"
                      name="resetPassword"
                      placeholder="Enter New Password"
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

export default ResetPassword;
