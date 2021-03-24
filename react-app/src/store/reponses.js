const SET_RESPONSES = "response/setResponses";
const REMOVE_RESPONSE = "response/removeResponse";
const ADD_RESPONSE = "response/addResponse";

const setResponses = (responses) => {
  return {
    type: SET_RESPONSES,
    payload: responses,
  };
};

const addResponse = (response) => {
    return {
        type: ADD_RESPONSE,
        payload: response 
    }
}

// const removeresponse = () => {
//   return {
//     type: REMOVE_response,
//   };
// };

export const getResponses = () => async (dispatch) => {
  let responses = await fetch(`/api/responses/`);
  responses = await responses.json();
  responses.sort((r1, r2) => {
      return Date.parse(r1.created_at) - Date.parse(r2.created_at);
    })
  dispatch(setResponses(responses));
  return responses;
};

export const clearResponses = () => async (dispatch) => {
  // dispatch(removeresponses());
  return "removed responses on logout";
};

export const createResponse = (node_id, politic_id, answer) => async (dispatch) => {
    let res = await fetch(`/api/responses/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        node_id,
        politic_id,
        answer
    }),
  });
  const response = await res.json();
  dispatch(addResponse(response));
  return response;
};

const initialState = [];

const responsesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_RESPONSES:
      const newResps = {};
      action.payload.forEach(res => {
        newResps[res.id] = res;
      })
      return {
        ...state,
        ...newResps,
        list: action.payload
      }
    case ADD_RESPONSE:
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

export default responsesReducer;
