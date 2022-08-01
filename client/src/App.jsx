import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./Actions/UserAction.js";
import Cart from "./Components/Cart/Cart.jsx";
import Contact from "./Components/Layouts/Contact/Contact.jsx";
import Footer from "./Components/Layouts/Footer/Footer.jsx";
import Header from "./Components/Layouts/Header/Header.jsx";

import Home from "./Components/Layouts/Home/Home.jsx";
import BookDetails from "./Components/Library/BookDetails.jsx";
import Favs from "./Components/Library/Favs.jsx";
import Library from "./Components/Library/Library.jsx";
import SearchBar from "./Components/Library/SearchBar.jsx";
import ProtectedRoute from "./Components/Routes/ProtectedRoute.jsx";
import ForgotPassForm from "./Components/User/ForgotPassForm.jsx";
import LoginRegisterForm from "./Components/User/LoginRegisterForm.jsx";
import Profile from "./Components/User/Profile.jsx";
import ResetPassword from "./Components/User/ResetPassword.jsx";
import UpdatePassword from "./Components/User/UpdatePassword.jsx";
import UpdateProfile from "./Components/User/UpdateProfile.jsx";

import { Store } from "./Store";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.User);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/login" element={<LoginRegisterForm />} />
        <Route path="/password/forgot" element={<ForgotPassForm />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/library/bag" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/account/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/account/favs" element={<Favs />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
