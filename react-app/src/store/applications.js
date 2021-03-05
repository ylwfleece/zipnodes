const SET_APPLICATIONS = "application/setApplications";
const REMOVE_APPLICATION = "application/removeApplication";
const ADD_APPLICATION = "application/addApplication";

const setApplications = (applications) => {
  return {
    type: SET_APPLICATIONS,
    payload: applications,
  };
};

const addApplication = (application) => {
    return {
        type: ADD_APPLICATION,
        payload: application
    }
}

const removeApplications = () => {
  return {
    type: REMOVE_APPLICATION,
  };
};

export const getApplications = () => async (dispatch) => {
  let applications = await fetch(`/api/applications/`);
  applications = await applications.json();
//   application.sort((post1, post2) => {
//       return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
//     })
  dispatch(setApplications(applications));
  return applications;
};

export const clearApplications = () => async (dispatch) => {
  dispatch(removeApplications());
  return "removed applications on logout";
};

export const createApplication = (node_id, order_id) => async (dispatch) => {
    let res = await fetch(`/api/applications/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        node_id,
        order_id
    }),
  });
  const application = await res.json();
  dispatch(addApplication(application));
  return application;
};

// export const deletePost = (postId) => async (dispatch) => {
//   await fetch(`/api/posts/delete/${postId}`);
//   dispatch(getPostsForUser());
//   return 'deleted post ' + postId;
// }

export const updateApplication = (appId) => async (dispatch) => {
  const res = await fetch(`/api/applications/update/${appId}`, {
    method: "POST",
  });
  const app = await res.json();
  dispatch(getApplications());
  return 'updated app';
}

const initialState = [];

const applicationsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_APPLICATIONS:
      newState = action.payload;
      return newState;
    case REMOVE_APPLICATION:
      newState = [];
      return newState;
    case ADD_APPLICATION:
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

export default applicationsReducer;
