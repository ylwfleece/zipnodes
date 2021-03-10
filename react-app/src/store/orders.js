const SET_ORDERS = "orders/setOrders";
const REMOVE_ORDER = "orders/removeOrder";
const ADD_ORDER = "orders/addOrder";

const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        payload: order
    }
}

const removeOrder = () => {
  return {
    type: REMOVE_ORDER,
  };
};

export const getOrders = () => async (dispatch) => {
  let orders = await fetch(`/api/orders/`);
  orders = await orders.json();
//   orders.sort((post1, post2) => {
//       return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
//     })
  dispatch(setOrders(orders));
  return orders;
};

export const clearOrders = () => async (dispatch) => {
  // dispatch(removeOrders());
  return "removed orders on logout";
};

export const createOrder = (nonprofitId, title, description, location, startTime, duration, karma, virtual) => async (dispatch) => {
    console.log(nonprofitId, title, description, location, startTime, duration, karma, virtual)
    if (virtual) {
      virtual = "True";
    } else {
      virtual = "False"
    }
    let res = await fetch(`/api/orders/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        "nonprofit_id": nonprofitId,
        title,
        description,
        location,
        duration,
        karma,
        "start_time": startTime,
        virtual
    }),
  });
  const order = await res.json();
  dispatch(addOrder(order));
  return order;
};

// export const deletePost = (postId) => async (dispatch) => {
//   await fetch(`/api/posts/delete/${postId}`);
//   dispatch(getPostsForUser());
//   return 'deleted post ' + postId;
// }

export const updateOrder = (order_id) => async (dispatch) => {
  const order = await fetch(`/api/orders/update/${order_id}`, {
    method: "POST",
    // body: caption,
  });
  dispatch(getOrders());
  return order;
}

const initialState = {};

const ordersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ORDERS:
      const newOrders = {};
      action.payload.forEach(order => {
        newOrders[order.id] = order;
      })
      return {
        ...state,
        ...newOrders,
        list: action.payload
      }
    case REMOVE_ORDER:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case ADD_ORDER:
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

export default ordersReducer;
