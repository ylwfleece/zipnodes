import React from "react";
import { logout } from "../../services/auth";
import { NavLink, useHistory } from 'react-router-dom';

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    //dispatch(logoutUser())
  };

  return <NavLink to='/' className='logout-button' onClick={onLogout}>logout</NavLink>;
};

export default LogoutButton;
