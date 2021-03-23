const SET_PURCHASES = "purchase/setPurchases";
const REMOVE_PURCHASE = "purchase/removePurchase";
const ADD_PURCHASE = "purchase/addPurchase";

const setPurchases = (purchases) => {
  return {
    type: SET_PURCHASES,
    payload: purchases,
  };
};

const addPurchase = (purchase) => {
    return {
        type: ADD_PURCHASE,
        payload: purchase 
    }
}

// const removePurchase = () => {
//   return {
//     type: REMOVE_PURCHASE,
//   };
// };

export const getPurchases = () => async (dispatch) => {
  let purchases = await fetch(`/api/purchases/`);
  purchases = await purchases.json();
  purchases.sort((p1, p2) => {
      return Date.parse(p1.created_at) - Date.parse(p2.created_at);
    })
  dispatch(setPurchases(purchases));
  return purchases;
};

export const clearPurchases = () => async (dispatch) => {
  // dispatch(removePurchases());
  return "removed Purchases on logout";
};

export const createPurchase = (node_id, project_id, num_shares) => async (dispatch) => {
    let res = await fetch(`/api/purchases/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        node_id,
        project_id,
        num_shares
    }),
  });
  const purchase = await res.json();
  dispatch(addPurchase(purchase));
  return purchase;
};

const initialState = [];

const purchasesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PURCHASES:
      const newPurs = {};
      action.payload.forEach(pur => {
        newPurs[pur.id] = pur;
      })
      return {
        ...state,
        ...newPurs,
        list: action.payload
      }
    case ADD_PURCHASE:
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

export default purchasesReducer;
