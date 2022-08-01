import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginUserRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: "LoginUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoginUserFail", payload: error.response.data.msg });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterUserRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: "RegisterUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "RegisterUserFail", payload: error.response.data.msg });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type: "LoadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data.msg });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: "LogOutUserSuccess" });
  } catch (error) {
    dispatch({ type: "LogOutUserFail", payload: error.response.data.msg });
  }
};

export const UpdateProfileData = (updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdateProfileRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/v1/me/update", updatedData, config);

    dispatch({ type: "UpdateProfileSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UpdateProfileFail", payload: error.response.data.msg });
  }
};

export const UpdateProfilePassword = (updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "UpdatePasswordRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/password/update",
      updatedData,
      config
    );

    dispatch({ type: "UpdatePasswordSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "UpdatePasswordFail", payload: error.response.data.msg });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "ForgotPasswordRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/password/forgot", email, config);
    // console.log(data);
    dispatch({ type: "ForgotPasswordSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "ForgotPasswordFail", payload: error.response.data.msg });
  }
};

export const resetPassword = (passwordsData, token) => async (dispatch) => {
  try {
    dispatch({ type: "ResetPasswordRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      passwordsData,
      config
    );

    // console.log(data);
    dispatch({ type: "ResetPasswordSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "ResetPasswordFail", payload: error.response.data.msg });
  }
};

export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
