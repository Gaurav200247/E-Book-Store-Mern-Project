import { createReducer } from "@reduxjs/toolkit";

export const newReviewReducer = createReducer(
  {},
  {
    CreateReviewRequest: (state, action) => {
      state.loading = true;
    },
    CreateReviewSuccess: (state, action) => {
      state.loading = false;
      state.review = action.payload;
    },
    CreateReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearErrors: (state, action) => {
      state.error = null;
    },
  }
);
