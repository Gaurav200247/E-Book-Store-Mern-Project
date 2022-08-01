import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Back_Video from "../../../videos/backvid5.mp4";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { getAllBooks } from "../../../Actions/BookAction";
import BookCard from "./BookCard.jsx";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, errors, books } = useSelector((state) => state.GetAllBooks);

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [toast, errors]);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="banner">
            <div className="video-banner">
              <video loop={true} autoPlay="autoplay" muted>
                <source src={Back_Video} />
              </video>
            </div>

            <div className="banner-info">
              <p>Welcome to E-Book Store</p>
              <h1>Take a look. Read a book!</h1>
              <a href="#homeHeading">
                <button>
                  Explore <CgMouse />
                </button>
              </a>
            </div>
          </div>

          <h1 id="homeHeading" className="truncate">
            Featured Books x Mangas
          </h1>

          <div className={`${books && books.books.length > 0 && "container"}`}>
            {books && books.books.length > 0 ? (
              books.books.map((item) => {
                return <BookCard key={item._id} {...item} />;
              })
            ) : (
              <h1 className="no-books-heading">No Books Yet</h1>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
