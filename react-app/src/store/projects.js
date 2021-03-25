const SET_PROJECTS = "projects/setProjects";
// const REMOVE_PROJECTS = "projects/removeProject";
const ADD_PROJECT = "projects/addProject";

const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    payload: projects,
  };
};

// const addProject = (project) => {
//     return {
//         type: ADD_PROJECT,
//         payload: projectsReducer
//     }
// }

// const removeProject = () => {
//   return {
//     type: REMOVE_PROJECT,
//   };
// };

export const getProjects = () => async (dispatch) => {
  let projects = await fetch(`/api/projects/`);
  projects = await projects.json();
  projects.sort((proj1, proj2) => {
      return Date.parse(proj1.end_time) - Date.parse(proj2.end_time);
    })
  dispatch(setProjects(projects));
  return projects;
};

export const clearprojects = () => async (dispatch) => {
  // dispatch(removeprojects());
  return "removed projects on logout";
};

export const createProject = (nonprofit_id, title, description, millikarma_per_share, cost_per_share, total_shares, end_time) => async (dispatch) => {
    //console.log(nonprofit_id, title, description, millikarma_per_share, cost_per_share, total_shares, end_time)
    let res = await fetch(`/api/projects/`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        nonprofit_id, title, description, millikarma_per_share, cost_per_share, total_shares, end_time
    }),
  });
  const project = await res.json();
  dispatch(getProjects());
  return project;
};

export const updateProject = (project_id) => async (dispatch) => {
  const res = await fetch(`/api/projects/update/${project_id}`);
  const project = await res.json();
  dispatch(getProjects());
  return project;
}

// export const deletePost = (postId) => async (dispatch) => {
//   await fetch(`/api/posts/delete/${postId}`);
//   dispatch(getPostsForUser());
//   return 'deleted post ' + postId;
// }

// export const updateOrder = (order_id) => async (dispatch) => {
//   const order = await fetch(`/api/projects/update/${order_id}`, {
//     method: "POST",
//     // body: caption,
//   });
//   dispatch(getprojects());
//   return order;
// }

const initialState = {};

const projectsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROJECTS:
      const newProjects = {};
      action.payload.forEach(proj => {
        newProjects[proj.id] = proj;
      })
      return {
        ...state,
        ...newProjects,
        list: action.payload
      }
    // case REMOVE_ORDER:
    //   const newState = { ...state };
    //   delete newState[action.payload];
    //   return newState;
    // case ADD_PROJECT:
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

export default projectsReducer;
