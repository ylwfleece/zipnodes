import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import ordersReducer from "./orders";
import applicationsReducer from "./applications";
import reviewsReducer from "./reviews";
import projectsReducer from "./projects";


const rootReducer = combineReducers({
  orders: ordersReducer,
  session: sessionReducer,
  applications: applicationsReducer,
  reviews: reviewsReducer,
  projects: projectsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
