import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import OrderForm from "./components/OrderForm";
import ApplicationForm from "./components/ApplicationForm";
import ReviewForm from "./components/ReviewForm";
import Feed from "./components/Feed";
import ApplicationProfile from "./components/ApplicationProfile";
import { getOrders } from "./store/orders";
import { getApplications } from "./store/applications";
import { getReviews } from "./store/reviews";

import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(getOrders);
        dispatch(getApplications());
        dispatch(getReviews());
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute
          path="/orders/new"
          exact={true}
          authenticated={authenticated}
        >
          {/* <NavBar setAuthenticated={setAuthenticated} /> */}
          <OrderForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/applications/new"
          exact={true}
          authenticated={authenticated}
        >
          {/* <NavBar setAuthenticated={setAuthenticated} /> */}
          <ApplicationForm />
        </ProtectedRoute>
        <ProtectedRoute
          path="/application/:id"
          exact={true}
          authenticated={authenticated}
        >
          {/* <NavBar setAuthenticated={setAuthenticated} /> */}
          <ApplicationProfile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reviews/new"
          exact={true}
          authenticated={authenticated}
        >
          {/* <NavBar setAuthenticated={setAuthenticated} /> */}
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <NavBar setAuthenticated={setAuthenticated} />
          <Feed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
