import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import "./library.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layouts/Loading/Loading";
import BookCard from "../Layouts/Home/BookCard.jsx";
import { toast } from "react-toastify";
import { ClearErrors, getAllBooks } from "../../Actions/BookAction";
import Slider from "@mui/material/Slider";
import { genres } from "../../Data";
import { useSearchParams } from "react-router-dom";

const Library = () => {
  const [title] = useSearchParams();

  const dispatch = useDispatch();

  const { loading, errors, books } = useSelector((state) => state.GetAllBooks);

  const [Page, setPage] = useState(1);
  const [filterBox, setfilterBox] = useState(false);

  const [Rating, setRating] = useState(5);
  const [Price, setPrice] = useState([0, 5000]);
  const [Type, setType] = useState("");
  const [SelectedGenre, setSelectedGenre] = useState([]);

  const AddToSelect = (e) => {
    let item = e.target.innerText;
    if (SelectedGenre.includes(item)) {
      return null;
    } else {
      setSelectedGenre([...SelectedGenre, item]);
    }
    // console.log(SelectedGenre);
  };

  const RemoveGenre = (item) => {
    let newArray = SelectedGenre.filter((genreItem) => genreItem !== item);
    // console.log(newArray);
    setSelectedGenre(newArray);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const SubmitFilters = () => {
    setPage(1);
    let searchTitle = title.get("title") || "";

    let FilterGenres = SelectedGenre.toLocaleString();
    // console.log(FilterGenres);

    dispatch(getAllBooks(searchTitle, Page, Price, Rating, Type, FilterGenres));
  };

  // Pages
  let AllPages = [];
  if (books && AllPages.length === 0) {
    let pageNos = Math.floor(books.totalSearchedBooks / 10 + 1);
    for (let i = 0; i < pageNos; i++) {
      AllPages.push(i + 1);
    }
  }
  const NextPage = () => {
    if (Page >= AllPages.length) {
      return;
    } else {
      setPage(Page + 1);
    }
  };
  const PrePage = () => {
    if (Page === 1) {
      return;
    } else {
      setPage(Page - 1);
    }
  };

  // Fetch Books
  useEffect(() => {
    let searchTitle = title.get("title") || "";
    dispatch(getAllBooks(searchTitle, Page));
  }, [dispatch, Page, title]);

  // Errors
  useEffect(() => {
    if (errors) {
      toast.error(errors);
      dispatch(ClearErrors());
    }
  }, [errors, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="library-container">
            <div>
              <h1 id="homeHeading" className="truncate">
                All Books x Mangas
              </h1>
              <div className="filter-btn-container">
                <button onClick={() => setfilterBox(!filterBox)}>
                  Filter <AiOutlineDown className="ml-2" />
                </button>
              </div>
            </div>

            <div className="library-block">
              {filterBox && (
                <div className="filterBox">
                  <div className="filter-1">
                    <h1>Price</h1>
                    <Slider
                      value={Price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      step={100}
                      min={0}
                      max={5000}
                    />
                  </div>

                  <div className="filter-3">
                    <h1>Ratings</h1>
                    <Slider
                      value={Rating}
                      onChange={(e, newRating) => {
                        setRating(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      step={0.5}
                      marks
                      min={0}
                      max={5}
                    />
                  </div>

                  <div className="filter-4">
                    <h1>Genres</h1>
                    <ul>
                      {genres.map((item, index) => {
                        return (
                          <li onClick={AddToSelect} key={index}>
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="filter-4">
                    <h1>Selected Genre</h1>
                    <ul>
                      {SelectedGenre.map((item, index) => {
                        return (
                          <li key={index} className="justify-around">
                            {item} <ImCross onClick={() => RemoveGenre(item)} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="filter-5">
                    <div>
                      <h2>Type</h2>
                      <select
                        value={Type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Book">Novel</option>
                        <option value="Manga">Manga</option>
                        <option value="Study">Study</option>
                        <option value="Biography">Biography</option>
                      </select>
                    </div>
                  </div>

                  <div className="filter-button-container">
                    <button
                      className="button-55 text-green-600 truncate"
                      onClick={SubmitFilters}
                    >
                      Submit Filters
                    </button>

                    <button
                      className="button-55 text-red-600 truncate"
                      onClick={() => window.location.reload()}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}

              <div className={`${filterBox && "width-less"} libraryBox`}>
                <div
                  className={`${
                    books && books.books.length > 0 && "container"
                  }`}
                >
                  {books && books.books.length > 0 ? (
                    books.books.map((item) => {
                      return <BookCard key={item._id} {...item} />;
                    })
                  ) : (
                    <h1 className="no-books-heading">No Books Yet</h1>
                  )}
                </div>

                <div className="paginationBox">
                  <ul>
                    <li className="pages keys" onClick={PrePage}>
                      Pre
                    </li>
                    {AllPages.map((item, index) => {
                      return (
                        <li
                          className={`pages ${item === Page && "selected"}`}
                          onClick={() => setPage(item)}
                          key={index}
                        >
                          {item}
                        </li>
                      );
                    })}
                    <li className="pages keys" onClick={NextPage}>
                      Next
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Library;
