import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Home, FavoriteBorder, Search, MailOutline, Explore } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { getOrders } from '../store/orders';
import { getApplications } from '../store/applications';
import { getReviews } from '../store/reviews';
// import ProfileButton from "./ProfileButton";
import LogoutButton from "./auth/LogoutButton";

const NavBar = ({ setAuthenticated }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
        dispatch(getOrders());
        dispatch(getApplications());
        dispatch(getReviews());
    })();
  }, [dispatch]);

  const iconStyles = { fontSize: '30px', color: 'rgb(38, 38, 38)' }

  return (user &&
    <nav>
      <div className='menu'>
        <div className='logo'>
          <NavLink style={{ paddingRight: '15px' }} to="/" exact={true} activeClassName="active">
            {/* <img alt='logo' style={{ maxHeight: '50px' }}></img> */}
            home
          </NavLink>
          {user.nonprofit && 
            <NavLink style={{ paddingRight: '15px' }} to="/orders/new" exact={true} activeClassName="active">
              new order
            </NavLink>
          }
          
        </div>
        <div>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
        <div>
          <NavLink style={{ paddingRight: '15px' }} to={`/users/${user.id}`}exact={true} activeClassName="active">
            profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
