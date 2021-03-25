const SET_POLITICS = "politics/setPolitics";
// const REMOVE_PoliticS = "politics/removePolitic";
const ADD_POLITIC = "politics/addPolitic";

const setPolitics = (politics) => {
  return {
    type: SET_POLITICS,
    payload: politics,
  };
};

// const addPolitic = (politic) => {
//     return {
//         type: ADD_Politic,
//         payload: politicsReducer
//     }
// }

// const removePolitic = () => {
//   return {
//     type: REMOVE_Politic,
//   };
// };

export const getPolitics = () => async (dispatch) => {
  let politics = await fetch(`/api/politics/`);
  politics = await politics.json();
  politics.sort((pol1, pol2) => {
      return Date.parse(pol1.end_time) - Date.parse(pol2.end_time);
    })
  dispatch(setPolitics(politics));
  console.log(politics.length)
  return politics;
};

export const clearpolitics = () => async (dispatch) => {
  // dispatch(removepolitics());
  return "removed politics on logout";
};

export const createPolitic = (nonprofit_id, title, description, question, end_time) => async (dispatch) => {
    //console.log(nonprofit_id, title, description, karma_per_share, cost_per_share, total_shares, end_time)
    let res = await fetch(`/api/politics/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        nonprofit_id, title, description, question, end_time
    }),
  });
  const politic = await res.json();
  dispatch(getPolitics());
  return politic;
};

// export const deletePost = (postId) => async (dispatch) => {
//   await fetch(`/api/posts/delete/${postId}`);
//   dispatch(getPostsForUser());
//   return 'deleted post ' + postId;
// }

// export const updateOrder = (order_id) => async (dispatch) => {
//   const order = await fetch(`/api/politics/update/${order_id}`, {
//     method: "POST",
//     // body: caption,
//   });
//   dispatch(getpolitics());
//   return order;
// }

const initialState = {};

const politicsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_POLITICS:
      const newPolitics = {};
      action.payload.forEach(pol => {
        newPolitics[pol.id] = pol;
      })
      return {
        ...state,
        ...newPolitics,
        list: action.payload
      }
    // case REMOVE_ORDER:
    //   const newState = { ...state };
    //   delete newState[action.payload];
    //   return newState;
    // case ADD_Politic:
    //   if (!state[action.payload.id]) {
    //     const newState = {
    //       ...state,
    //       [action.payload.id]: action.payload
    //     };
    //     return newState;
    //   } else {
    //     state[action.payload.id] = action.payload
    //     return { state }
    //   }
    default:
      return state;
  }
};

export default politicsReducer;
