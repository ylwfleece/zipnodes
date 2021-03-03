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
  console.log(res)
  const order = await res.json();
  dispatch(addOrder(order));
  return order;
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
