import { configureStore } from "@reduxjs/toolkit";

import {
  GetAllBooksReducer,
  GetSingleBooksReducer,
} from "./Reducers/BookReducer";

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
  },
});
