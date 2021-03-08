const SET_REVIEWS = "review/setReviews";
const REMOVE_REVIEW = "review/removeReview";
const ADD_REVIEW = "review/addReview";

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews,
  };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
}

const removeReview = () => {
  return {
    type: REMOVE_REVIEW,
  };
};

export const getReviews = () => async (dispatch) => {
  let reviews = await fetch(`/api/reviews/`);
  reviews = await reviews.json();
//   REVIEW.sort((post1, post2) => {
//       return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
//     })
  dispatch(setReviews(reviews));
  return reviews;
};

export const clearReviews = () => async (dispatch) => {
  // dispatch(removeReviews());
  return "removed reviews on logout";
};

export const createReview = (writer_id, application_id, content, score, response_id) => async (dispatch) => {
    let res = await fetch(`/api/reviews/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        writer_id, 
        application_id, 
        content, 
        score
    }),
  });
  const review = await res.json();
  // dispatch(addReview(review));
  dispatch(getReviews());
  return review;
};

// export const deletePost = (postId) => async (dispatch) => {
//   await fetch(`/api/posts/delete/${postId}`);
//   dispatch(getPostsForUser());
//   return 'deleted post ' + postId;
// }

// export const editPost = (postId, caption) => async (dispatch) => {
//   await fetch(`/api/posts/edit/${postId}`, {
//     method: "POST",
//     body: caption,
//   });
//   dispatch(getPostsForUser());
//   return 'edited post';
// }

const initialState = [];

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_REVIEWS:
      const newReviews = {};
      action.payload.forEach(rev => {
        newReviews[rev.id] = rev;
      })
      return {
        ...state,
        ...newReviews,
        list: action.payload
      }
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case ADD_REVIEW:
      if (!state[action.payload.id]) {
        const newState = {
          ...state,
          [action.payload.id]: action.payload
        };
        return newState;
      } else {
        state[action.payload.id] = action.payload
        return { state }
      }
    default:
      return state;
  }
};

export default reviewsReducer;
