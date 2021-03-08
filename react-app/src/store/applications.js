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

const removeApplication = () => {
  return {
    type: REMOVE_APPLICATION,
  };
};

export const getApplications = () => async (dispatch) => {
  let applications = await fetch(`/api/applications`);
  applications = await applications.json();
//   application.sort((post1, post2) => {
//       return Date.parse(post2.createdAt) - Date.parse(post1.createdAt)
//     })
  dispatch(setApplications(applications));
  return applications;
};

export const clearApplications = () => async (dispatch) => {
  // dispatch(removeApplications());
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
  const res = await fetch(`/api/applications/update/${appId}/`, {
    method: "POST",
  });
  const app = await res.json();
  dispatch(getApplications());
  return app;
}

const initialState = [];

const applicationsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_APPLICATIONS:
      const newApps = {};
      action.payload.forEach(app => {
        newApps[app.id] = app;
      })
      return {
        ...state,
        ...newApps,
        list: action.payload
      }
    case REMOVE_APPLICATION:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case ADD_APPLICATION:
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

export default applicationsReducer;
