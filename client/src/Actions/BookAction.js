import axios from "axios";

export const getAllBooks =
  (
    title = "",
    Page = 1,
    Price = [0, 5000],
    Rating = 5,
    Type = "All",
    FilterGenres = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "GetAllBooksRequest" });

      const link = `/api/v1/books?title=${title}&page=${Page}&price=${Price[0]},${Price[1]}&rating=${Rating}&type=${Type}&genres=${FilterGenres}`;

      const { data } = await axios.get(link);
      // console.log(data);

      dispatch({ type: "GetAllBooksSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "GetAllBooksFail", payload: error.response.data.msg });
    }
  };

export const getSingleBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetSingleBooksRequest" });

    const { data } = await axios.get(`/api/v1/books/${id}`);

    dispatch({ type: "GetSingleBooksSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "GetSingleBooksFail", payload: error.response.data.msg });
  }
};

export const createNewBook = (newBookData) => async (dispatch) => {
  // console.log(newBookData);
  try {
    dispatch({ type: "NewBookRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/books`, newBookData, config);

    dispatch({ type: "NewBookSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "NewBookFail", payload: error.response.data.msg });
  }
};

export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
