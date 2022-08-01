import { createReducer } from "@reduxjs/toolkit";

export const UserReducer = createReducer(
  {},
  {
    // ----------------Login User ----------------
    LoginUserRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LoginUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    LoginUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // ----------------Register User----------------
    RegisterUserRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    RegisterUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    RegisterUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // ----------------Load User----------------

    LoadUserRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // ----------------Log Out User----------------

    LogOutUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    LogOutUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ----------------Clear Errors----------------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const ProfileReducer = createReducer(
  {},
  {
    // ----------------- Update User Profile -----------------
    UpdateProfileRequest: (state, action) => {
      state.loading = true;
    },
    UpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateProfileReset: (state, action) => {
      state.isUpdated = false;
    },
    // ----------------- Update User Password -----------------
    UpdatePasswordRequest: (state, action) => {
      state.loading = true;
    },
    UpdatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UpdatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdatePasswordReset: (state, action) => {
      state.isUpdated = false;
    },
    // ----------------Clear Errors----------------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);

export const forgotPasswordReducer = createReducer(
  {},
  {
    // ----------------- Update User Profile -----------------
    ForgotPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    ForgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    ForgotPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ----------------- Update User Password -----------------
    ResetPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    ResetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    ResetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ----------------Clear Errors----------------
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);
