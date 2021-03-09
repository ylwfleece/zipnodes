import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    //dispatch(logoutUser())
  };

  return <button className='logout-button' onClick={onLogout}>logout</button>;
};

export default LogoutButton;
