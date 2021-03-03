const SET_ORDERS = "posts/setOrders";
const REMOVE_ORDERS = "posts/removeOrders";
const CREATE_ORDER = "posts/createOrder";

const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

const removeOrders = () => {
  return {
    type: REMOVE_ORDERS,
  };
};

const createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    payload: order,
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

// export const createOrder = (caption, photoFile) => async (dispatch) => {
//   const formData = new FormData();
//   formData.append("caption", caption);
//   if (photoFile) {
//     formData.append("feed_photo_file", photoFile);
//   } else {
//     return "Failed to attach a photo";
//   }
//   let res = await fetch(`/api/orders/`, {
//     method: "POST",
//     body: formData,
//   });
//   const post = await res.json();
//   dispatch(createOnePost(post));
//   return post;
// };

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
    case CREATE_ORDER:
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
