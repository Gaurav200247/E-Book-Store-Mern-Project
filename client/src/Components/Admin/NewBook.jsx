import React, { useState, useRef, useEffect } from "react";

import { Form, Formik, Field } from "formik";

import { genres } from "../../Data";
import SideBar from "./SideBar";

import CreateIcon from "@mui/icons-material/Create";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddIcon from "@mui/icons-material/Add";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import StyleIcon from "@mui/icons-material/Style";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import { ImCross } from "react-icons/im";
import { BsTrashFill } from "react-icons/bs";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { ClearErrors, createNewBook } from "../../Actions/BookAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewBook = () => {
  const uploadPDFInput = useRef(null);
  const uploadImageInput = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, RequestError } = useSelector(
    (state) => state.newBook
  );

  useEffect(() => {
    if (RequestError) {
      toast.error(RequestError);
      console.log(RequestError);
      dispatch(ClearErrors());
    }

    if (success) {
      toast.success("Book Created SuccessFully !!");
      navigate("/admin/dashboard");
      dispatch({ type: "NewBookReset" });
    }
  }, [dispatch, RequestError, success, navigate]);

  return (
    <div className="Dashboard">
      <SideBar />

      <div className="admin-info-block">
        <div className="admin-form-container">
          <h1 className="myform-heading">Add New Book</h1>

          <div className="admin-form-outer">
            <Formik
              className="w-full"
              initialValues={{
                title: "",
                price: "",
                bookType: "",
                genre: [],
                authorNameInp: "",
                authors: [],
                chapter_no: "",
                volume_no: "",
                synopsis: "",
                avatar: [],
                featured: "false",
                original_PDF: "",
              }}
              onSubmit={(values) => {
                console.log(values);

                const myForm = new FormData();

                myForm.set("title", values.title);
                myForm.set("price", values.price);
                myForm.set("type", values.bookType);
                myForm.set("chapter_no", values.chapter_no);
                myForm.set("volume_no", values.volume_no);
                myForm.set("synopsis", values.synopsis);
                myForm.set("featured", values.featured);

                values.avatar.forEach((image) => {
                  myForm.append("images", image);
                });

                values.authors.forEach((author) => {
                  myForm.append("authors", author);
                });

                values.genre.forEach((SingleGenre) => {
                  myForm.append("genres", SingleGenre);
                });

                dispatch(createNewBook(myForm));
              }}
            >
              {({ values, setFieldValue }) => (
                <Form
                  className="mb-10 admin-form-inner"
                  encType="multipart/form-data"
                >
                  <div>
                    <div className="right">
                      <div className="form-input ">
                        <CreateIcon />
                        <Field
                          type="text"
                          name="title"
                          placeholder="Book Title"
                          required
                        />
                      </div>

                      <div className="form-input">
                        <CurrencyRupeeIcon />
                        <Field
                          type="number"
                          name="price"
                          placeholder="Book Price"
                          required
                        />
                      </div>

                      <div className="form-input">
                        <AutoStoriesIcon />
                        <Field name="bookType" as="select" required>
                          <option value="">Select Book Type</option>
                          <option value="Book">Novel</option>
                          <option value="Manga">Manga</option>
                          <option value="Study">Study</option>
                          <option value="Biography">Biography</option>
                        </Field>
                      </div>

                      <div className="form-input">
                        <StarIcon />
                        <Field name="featured" as="select" required>
                          <option value="false">false</option>
                          <option value="true">true</option>
                        </Field>
                      </div>

                      <div className="form-input">
                        <div className="filter-4">
                          <h1>Select Genres</h1>
                          <ul>
                            {genres.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={(event) => {
                                    let item = event.target.innerText;
                                    if (values.genre.includes(item)) {
                                      return null;
                                    } else {
                                      setFieldValue("genre", [
                                        ...values.genre,
                                        item,
                                      ]);
                                    }
                                  }}
                                >
                                  {item}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      {values.genre.length > 0 && (
                        <div className="form-input">
                          <div className="filter-4">
                            <h1>Selected Genres</h1>
                            <ul>
                              {values.genre.map((item, index) => {
                                return (
                                  <li key={index} className="justify-around">
                                    {item}
                                    <ImCross
                                      onClick={(event) => {
                                        let item =
                                          event.target.parentElement
                                            .parentElement.innerText;

                                        let newArray = values.genre.filter(
                                          (genreItem) => genreItem !== item
                                        );
                                        setFieldValue("genre", newArray);
                                      }}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="left">
                      <div className="form-input">
                        <Field
                          type="text"
                          name="authorNameInp"
                          placeholder="Book Author"
                        />
                        <AddIcon
                          className="cursor-pointer text-green-600"
                          onClick={() => {
                            if (values.authorNameInp) {
                              setFieldValue("authors", [
                                ...values.authors,
                                values.authorNameInp,
                              ]);
                            } else {
                              return null;
                            }
                          }}
                        />
                      </div>

                      {values.authors.length > 0 && (
                        <div className="form-input">
                          <div className="authors-preview-box">
                            <h1>Authors</h1>
                            <ul>
                              {values.authors.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <p>{item}</p>
                                    <button
                                      type="button"
                                      className="cursor-pointer text-red-600"
                                      onClick={(event) => {
                                        let authorName =
                                          event.currentTarget
                                            .previousElementSibling.innerText;

                                        const newArray = values.authors.filter(
                                          (item) => item !== authorName
                                        );
                                        setFieldValue("authors", newArray);
                                      }}
                                    >
                                      <RemoveIcon />
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}

                      <div className="form-input">
                        <StickyNote2Icon />
                        <Field
                          type="number"
                          name="chapter_no"
                          placeholder="Chapter No."
                          required
                        />
                      </div>

                      <div className="form-input">
                        <StyleIcon />
                        <Field
                          type="number"
                          name="volume_no"
                          placeholder="Volume No."
                          required
                        />
                      </div>

                      <div className="long-inp">
                        <DescriptionIcon />
                        <Field
                          as="textarea"
                          cols="30"
                          rows="5"
                          placeholder="Book Synopsis"
                          name="synopsis"
                          required
                        ></Field>
                      </div>

                      <div className="form-input">
                        <ImageIcon />
                        <input
                          hidden
                          type="file"
                          ref={uploadImageInput}
                          onChange={(event) => {
                            const files = Array.from(event.target.files);

                            files.forEach((file) => {
                              const reader = new FileReader();

                              reader.onload = () => {
                                if (reader.readyState === 2) {
                                  setFieldValue("avatar", [
                                    ...values.avatar,
                                    reader.result,
                                  ]);
                                }
                              };

                              reader.readAsDataURL(file);
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="btn upload-btn bg-lime-600 text-white hover:bg-lime-700"
                          onClick={() => {
                            uploadImageInput.current.click();
                          }}
                        >
                          Upload Book Images
                        </button>
                      </div>

                      {values.avatar.length > 0 && (
                        <div className="avatar-preview-container">
                          {values.avatar.map((item, index) => {
                            return (
                              <div key={index}>
                                <img src={item} alt={index} />
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    let delAvatar =
                                      event.currentTarget.previousElementSibling
                                        .src;

                                    const newArray = values.avatar.filter(
                                      (item) => item !== delAvatar
                                    );
                                    setFieldValue("avatar", newArray);
                                  }}
                                >
                                  <BsTrashFill />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="form-input">
                        <PictureAsPdfIcon />
                        <input
                          hidden
                          type="file"
                          ref={uploadPDFInput}
                          onChange={(event) => {
                            const reader = new FileReader();

                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setFieldValue("original_PDF", reader.result);
                              }
                            };

                            reader.readAsDataURL(event.target.files[0]);
                          }}
                        />
                        <button
                          type="button"
                          className="btn upload-btn bg-red-600 text-white hover:bg-red-700"
                          onClick={() => {
                            uploadPDFInput.current.click();
                          }}
                        >
                          Upload Book PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  {values.Full_PDF && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                      <div className="admin-pdf-container">
                        <Viewer fileUrl={values.original_PDF} />
                      </div>
                    </Worker>
                  )}

                  <input
                    type="submit"
                    className="btn login-btn w-1/3 bg-sky-600 text-white hover:bg-sky-500"
                    disabled={loading ? true : false}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
