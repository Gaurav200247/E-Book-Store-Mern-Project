import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleBook } from "../../Actions/BookAction";
import Loading from "../Layouts/Loading/Loading";
import "./BookDetails.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Rating from "@mui/material/Rating";
import { colors } from "../../Data";
import { AiOutlineRight } from "react-icons/ai";
import ReviewCard from "./ReviewCard.jsx";
import pdf from "../../videos/manga_1.pdf";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, errors, book } = useSelector((state) => state.GetSingleBook);
  const { isAuthenticated } = useSelector((state) => state.User);

  let favList = [];
  let mycart = [];
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (book && book._id) {
        if (localStorage.getItem("favList")) {
          favList = JSON.parse(localStorage.getItem("favList"));

          const found = favList.find((item) => item._id === book._id);

          if (found) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      }
    } else {
      setIsLiked(false);
    }
  }, [isLiked, favList, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      if (book && book._id) {
        if (localStorage.getItem("mycart")) {
          mycart = JSON.parse(localStorage.getItem("mycart"));

          const found = mycart.find((item) => item._id === book._id);

          if (found) {
            setIsAdded(true);
          } else {
            setIsAdded(false);
          }
        }
      }
    } else {
      setIsAdded(false);
    }
  }, [isAdded, mycart, isAuthenticated]);

  // Get Book Details
  useEffect(() => {
    dispatch(getSingleBook(id));
  }, [dispatch, id]);

  // Errors
  useEffect(() => {
    if (errors) {
      toast.error(errors);
      dispatch(ClearErrors());
    }
  }, [toast, errors]);

  const AddToFav = () => {
    if (isAuthenticated) {
      if (localStorage.getItem("favList")) {
        favList = JSON.parse(localStorage.getItem("favList"));

        const found = favList.find((item) => item._id === book._id);

        if (found) {
          let newList = favList.filter((item) => item !== found);
          localStorage.setItem("favList", JSON.stringify(newList));
          toast.dark("Removed from Favourites.");
          setIsLiked(false);
        } else {
          favList.push(book);
          localStorage.setItem("favList", JSON.stringify(favList));
          toast.success("Added to Favourites.");
          setIsLiked(true);
        }
      } else {
        favList.push(book);
        localStorage.setItem("favList", JSON.stringify(favList));
        toast.success("Added to Favourites.");
        setIsLiked(true);
      }
    } else {
      navigate("/login");
      toast.dark("Please Login to create your Favourite List");
    }
  };

  const AddToBag = () => {
    if (isAuthenticated) {
      if (localStorage.getItem("mycart")) {
        mycart = JSON.parse(localStorage.getItem("mycart"));

        const found = mycart.find((item) => item._id === book._id);

        if (found) {
          let newList = mycart.filter((item) => item !== found);
          localStorage.setItem("mycart", JSON.stringify(newList));
          toast.dark("Removed from your bag");
          setIsAdded(false);
        } else {
          mycart.push(book);
          localStorage.setItem("mycart", JSON.stringify(mycart));
          toast.success("Added to your bag.");
          setIsAdded(true);
        }
      } else {
        mycart.push(book);
        localStorage.setItem("mycart", JSON.stringify(mycart));
        toast.success("Added to your bag");
        setIsAdded(true);
      }
    } else {
      navigate("/login");
      toast.dark("Please Login to create your Bag");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="BookDetails">
          <div className="route-container" id="up">
            <Link to="/">
              Home <AiOutlineRight />
            </Link>
            <Link to="/library">
              Library <AiOutlineRight />
            </Link>
            <Link to={`/books/${book && book._id}`}>
              {book && book.title} <AiOutlineRight />
            </Link>
          </div>

          <div className="book-details-block">
            <div className="Book-image-container">
              <div className="fav-btn-container">
                <button onClick={AddToFav}>
                  {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
              </div>

              <div>
                <Carousel
                  stopOnHover={true}
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={2000}
                  showThumbs={false}
                  showStatus={false}
                >
                  {book &&
                    book.images.map((item, index) => {
                      return (
                        <div key={index}>
                          <img src={item.url} alt={item.url} />
                        </div>
                      );
                    })}
                </Carousel>
              </div>
            </div>

            <div className="Book-info-container">
              <div className="block-1">
                <h1>{book && book.title}</h1>
                <p className="text-gray-600">#{book && book._id}</p>
                <div>
                  <Rating
                    value={book && book.rating}
                    readOnly
                    precision={0.5}
                    size={window.innerWidth < 900 ? "small" : "medium"}
                  />

                  <p className="truncate">
                    ({book && book.reviews.length}) Reviews
                  </p>
                </div>
              </div>

              <div className="block-2" id="Block-2">
                <div className="price-container">
                  <h1>Price :</h1>
                  <p className="ml-3">₹ {book && book.price}</p>
                </div>

                <div className="price-container">
                  <h1>Rent :</h1>
                  <p className="ml-3 line-through">₹ {book && book.price}</p>
                  <p className="ml-3">₹ {book && book.rentPrice} for 7 days</p>
                </div>
              </div>

              <div className="price-container">
                <div className="add-to-library">
                  <button onClick={AddToBag}>
                    {isAdded ? "Remove From My Bag" : "Add To My Bag"}
                  </button>
                </div>
              </div>

              <div className="block-3">
                <div>
                  <h1>Author :</h1>
                  <ul>
                    {book &&
                      book.authors.map((item) => {
                        return <li key={item._id}>{item.name}</li>;
                      })}
                  </ul>
                </div>

                {book && book.chapter_no && (
                  <div>
                    <h1>Chapter No. :</h1>
                    <p className="text-purple-600">{book.chapter_no}</p>
                  </div>
                )}

                {book && book.volume_no && (
                  <div>
                    <h1>Volume No. :</h1>
                    <p className="text-purple-600">{book.volume_no}</p>
                  </div>
                )}

                <div>
                  <h1>Genres :</h1>
                  <ul>
                    {book &&
                      book.genres.map((item, index) => {
                        return (
                          <li
                            style={{ color: `${colors[index]}` }}
                            // className={`text-${colors[index]}-600`}
                            key={index}
                          >
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div>
                  <h1>Synopsis :</h1>
                  <p>{book && book.synopsis}</p>
                </div>
              </div>

              {/*  */}
            </div>
          </div>

          <div className="preview-review-block">
            <div className="pdf-preview-block">
              <h1 id="homeHeading" className="truncate">
                PDF Preview
              </h1>
              {book && book.pdfs && book.pdfs.previewPdf ? (
                <div className="pdf-container">
                  <iframe
                    src={pdf}
                    className="w-full"
                    width="100%"
                    height="100%"
                    frameborder="0"
                  ></iframe>
                </div>
              ) : (
                <h1 className="no-reviews-yet">Preview Not Available</h1>
              )}

              <div className="add-to-library-2">
                <a href="#up">Buy / Rent</a>
              </div>
            </div>

            <div className="reviews-block">
              <h1 id="reviewHeading" className="truncate">
                Reviews
              </h1>
              <div className="reviews-container">
                {book && book.reviews.length > 0 ? (
                  book.reviews.map((item, index) => {
                    return <ReviewCard {...item} key={index} />;
                  })
                ) : (
                  <h1 className="no-reviews-yet">
                    No Reviews Yet
                    <br />
                    <br />
                    <br />
                    Be The First To Review !!
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
