import { configureStore } from "@reduxjs/toolkit";

import {
  GetAllBooksReducer,
  GetSingleBooksReducer,
  NewBookReducer,
} from "./Reducers/BookReducer";
import { newReviewReducer } from "./Reducers/reviewReducer";

import {
  forgotPasswordReducer,
  ProfileReducer,
  UserReducer,
} from "./Reducers/UserReducer";

export const Store = configureStore({
  reducer: {
    GetAllBooks: GetAllBooksReducer,
    GetSingleBook: GetSingleBooksReducer,
    User: UserReducer,
    Profile: ProfileReducer,
    forgotPass: forgotPasswordReducer,
    newReview: newReviewReducer,

    newBook: NewBookReducer,
  },
});
