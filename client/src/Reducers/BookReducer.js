import { createReducer } from "@reduxjs/toolkit";

export const GetAllBooksReducer = createReducer(
  {},
  {
    GetAllBooksRequest: (state, action) => {
      state.loading = true;
    },
    GetAllBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    GetAllBooksFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    ClearErrors: (state, action) => {
      state.errors = null;
    },
  }
);

export const GetSingleBooksReducer = createReducer(
  {},
  {
    GetSingleBooksRequest: (state, action) => {
      state.loading = true;
    },
    GetSingleBooksSuccess: (state, action) => {
      state.loading = false;
      state.book = action.payload.book;
    },
    GetSingleBooksFail: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    ClearErrors: (state, action) => {
      state.errors = null;
    },
  }
);
export const NewBookReducer = createReducer(
  {},
  {
    NewBookRequest: (state) => {
      state.loading = true;
    },
    NewBookSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.book = action.payload.book;
    },
    NewBookFail: (state, action) => {
      state.loading = false;
      state.RequestError = action.payload;
    },
    NewBookReset: (state, action) => {
      state.success = false;
    },

    ClearErrors: (state) => {
      state.RequestError = null;
    },
  }
);
