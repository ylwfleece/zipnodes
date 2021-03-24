import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Home, FavoriteBorder, Search, MailOutline, Explore } from '@material-ui/icons'
import { useState, useEffect } from 'react';
import { getOrders } from '../store/orders';
import { getApplications } from '../store/applications';
import { getReviews } from '../store/reviews';
import { getProjects } from '../store/projects';
import { getPurchases } from '../store/purchases';
import { getPolitics } from '../store/politics';
// import ProfileButton from "./ProfileButton";
import LogoutButton from "./auth/LogoutButton";
import logo from './auth/zipnodes_logo.png';

const NavBar = ({ setAuthenticated }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      dispatch(getOrders());
      dispatch(getApplications());
      dispatch(getReviews());
      dispatch(getProjects());
      dispatch(getPurchases());
      dispatch(getPolitics());
    })();
  }, [dispatch]);

  const ords = useSelector(state => state.orders.list);
  const apps = useSelector(state => state.applications.list);
  const revs = useSelector(state => state.reviews.list);

  let notifs = [];
  if (ords && apps && revs) {
    if (user.nonprofit) {
      // your open order has pending apps
      // get open orders
      const openOrds = ords.filter(ord => ord.nonprofit_id == user.id && ord.status == 'Open' && ord.has_pending_apps);
      openOrds.forEach(ord => notifs.push(`${ord.title} has pending applications`));
      // your order is awaiting confirmation
      const pendingOrds = ords.filter(ord => ord.nonprofit_id == user.id && ord.status == 'Pending' && ord.has_accepted_app);
      pendingOrds.forEach(ord => notifs.push(`${ord.title} is awaiting confirmation from node`));
      // your order has been confirmed
      const ipOrds = ords.filter(ord => ord.nonprofit_id == user.id && ord.status == 'In Progress' && ord.has_confirmed_app);
      ipOrds.forEach(ord => notifs.push(`${ord.title} is in progress and awaiting review`))

      console.log(notifs);
    } else {
      // your app has been accepted
      const acceptedApps = apps.filter(app => app.node_id == user.id && app.status == 'Accepted');
      acceptedApps.forEach(app => notifs.push(`app awaits confirmation`));
      // you have a new review
      const newRevs = revs.filter(rev => rev.reviewee_id == user.id && !rev.response_id && rev.score != 1);
      newRevs.forEach(rev => notifs.push('new review awaits response'));
    }
  }


  const iconStyles = { fontSize: '30px', color: 'rgb(38, 38, 38)' }

  return (user &&
    <nav>
      <div className='menu'>
        <div className='logo'>
          <NavLink style={{ paddingRight: '5px' }} to="/" exact={true} activeClassName="active">
            <img src={logo} alt='logo' style={{ maxHeight: '50px' }}></img>
          </NavLink>
        </div>
        <div>
        {notifs.length > 0 &&
            <NavLink style={{ color: 'red', paddingRight: '15px', paddingLeft: '5px' }} to="/notifications" exact={true} activeClassName="active">
              notifications ({notifs.length})
            </NavLink>
          }
          {user.nonprofit &&
          <>
            <NavLink style={{ color: 'rgb(14,164,227)', paddingRight: '15px', paddingLeft: '5px' }} to="/orders/new" exact={true} activeClassName="active">
              new order
            </NavLink>
            <NavLink style={{ color: 'rgb(14,164,227)', paddingRight: '15px', paddingLeft: '5px' }} to="/projects/new" exact={true} activeClassName="active">
            new project
          </NavLink>
          <NavLink style={{ color: 'rgb(14,164,227)', paddingRight: '15px', paddingLeft: '5px' }} to="/politics/new" exact={true} activeClassName="active">
            new politic
          </NavLink>
          </>
          }
          <NavLink style={{ paddingRight: '15px', paddingLeft: '5px', color: 'rgb(14,164,227)' }} to={`/users/${user.id}`} exact={true} activeClassName="active">
            profile
          </NavLink>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
