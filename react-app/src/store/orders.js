const SET_ORDERS = "orders/setOrders";
const REMOVE_ORDERS = "orders/removeOrders";
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

const removeOrders = () => {
  return {
    type: REMOVE_ORDERS,
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
  dispatch(removeOrders());
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

const initialState = [];

const ordersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ORDERS:
      newState = action.payload;
      return newState;
    case REMOVE_ORDERS:
      newState = [];
      return newState;
    case ADD_ORDER:
      newState = [...state]
      if(newState){
          newState.unshift(action.payload); 
          return newState; 
      }
      else{
          newState = [action.payload];
          return newState;
      }
    default:
      return state;
  }
};

export default ordersReducer;
