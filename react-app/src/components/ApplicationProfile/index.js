import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelApplication, confirmApplication, acceptApplication } from "../../store/applications";
import { getOrders } from "../../store/orders";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notify = (msg) => toast(msg);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const app = useSelector((state) => state.applications[params.id]);
  const orders = useSelector((state) => state.orders);
  let ord_location = "";
  let ord_np_un = "";
  if (app && orders) {
    if (orders[app.order_id]) {
      ord_location = orders[app.order_id].location;
      ord_np_un = orders[app.order_id].nonprofit_username;
    }
  }

  let reviews = useSelector((state) => state.reviews.list);

  let score = 0;
  let divisor = 0;
  let karma = 0;
  let completions = 0;
  if (reviews && app) {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].reviewee_id == app.node_id) {
        score += reviews[i].score;
        if (reviews[i].score > 1) {
          karma += reviews[i].karma;
        }
        divisor += 1;
      }
    }
    if (divisor > 0) {
      score = Math.round(10 * (score / divisor)) / 10;
    }
  }

  const acceptApp = async () => {
    await dispatch(acceptApplication(app.id));
    await dispatch(getOrders());
    notify(`Successfully accepted app for "${app.order_title}"`);
    history.push(`/order/${app.order_id}`);
  }

  const confirmApp = async () => {
    // dispatch to update app to confirmed and order to inprogress
    await dispatch(confirmApplication(app.id));
    await dispatch(getOrders());
    notify(`Successfully confirmed app for: ${app.order_title}`);
    history.push(`/order/${app.order_id}`);
  }

  const cancelApp = async () => {
    // dispatch to cancel app and order back to open
    await dispatch(cancelApplication(app.id));
    await dispatch(getOrders());
    notify(`Successfully cancelled app for: ${app.order_title}`);
    history.push(`/order/${app.order_id}`);
  }

  return (
    <div className='app-profile-container'>
      <div>
        {app &&
          <div className='app-profile'>
            <div className='app-order-title'>
              <Link to={`/order/${app.order_id}`}>{app.order_title} for {ord_np_un}</Link>
            </div>
            <div className='app-order-start'>
              {app.order_start_time}
            </div>
            <div className='app-order-location'>
              {ord_location}
            </div>
            {user.nonprofit &&
              <div className='app-order-location'>
                {app.node.username} (score: {score} | karma: {karma})
                </div>
            }
            <div className='app-status'>
              {(app.status == 'Pending') &&
                <>
                  <p className='pending-status'>status: {app.status}</p>
                  <div className='link-container'>
                    {!user.nonprofit && 
                     <p className='cancel-link' onClick={cancelApp}>> cancel</p>
                    }
                    {user.nonprofit && 
                      <p className='confirm-link' onClick={acceptApp}>> accept</p>
                    }
                  </div>
                </>
              }
              {(app.status == 'Accepted') &&
                <>
                  <p className='pending-status'>application status: {app.status}</p>
                  <div className='link-container'>
                    {!user.nonprofit &&
                    <>
                      <p className='confirm-link' onClick={confirmApp}>> confirm</p>
                      <p className='cancel-link' onClick={cancelApp}>> cancel</p>
                    </>
                    }
                  </div>
                </>
              }
              {(app.status == 'Confirmed') &&
                <p className='complete-status'>application status: {app.status}</p>
              }
              {(app.status == 'Cancelled') &&
                <p className='cancel-status'>application status: {app.status}</p>
              }
            </div>
          </div>
        }
      <div style={{ marginLeft: '0px'}} className='back-link-container'>
        <Link className='back-link' to={`/order/${app.order_id}/apps`}>back</Link>
      </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
