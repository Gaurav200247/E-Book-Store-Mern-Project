import axios from "axios";

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateReviewRequest" });

    const config = {
      headers: {
        "Content-Type": "appliaction/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({ type: "CreateReviewSuccess", payload: data.success });
  } catch (error) {
    dispatch({ type: "CreateReviewFail", payload: error.response.data.msg });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};
