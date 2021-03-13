import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelApplication, confirmApplication } from "../../store/applications";
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
  if (app && orders) {
    if (orders[app.order_id]) {
      ord_location = orders[app.order_id].location;
    }
  }

  const confirmApp = async () => {
    // dispatch to update app to confirmed and order to inprogress
    await dispatch(confirmApplication(app.id));
    await dispatch(getOrders());
    notify('confirmed app');
    history.push(`/order/${app.order_id}`);
    
  }

  const cancelApp = async () => {
    // dispatch to cancel app and order back to open
    await dispatch(cancelApplication(app.id));
    await dispatch(getOrders());
    notify('cancelled app');
    history.push(`/order/${app.order_id}`);
  }

  return (
    <div className='app-profile-container'>
      <div>
        <div className='app-profile'>
          {app &&
            <>
              <div className='order-title'>
                <Link to={`/order/${app.order_id}`}>{app.order_title}</Link>
              </div>
              <div className='order-start'>
                {app.order_start_time}
              </div>
              <div className='order-location'>
                {ord_location}
              </div>
              {user.nonprofit &&
                <div className='order-location'>
                  {app.node.username} (score: {app.node.score})
                </div>
              }
              <div className='app-status'>
                {(app.status == 'Pending') &&
                  <>
                    <p className='pending-status'>status: {app.status}</p>
                    <div className='link-container'>
                      <p className='cancel-link' onClick={cancelApp}>> cancel</p>
                    </div>
                  </>
                }
                {(app.status == 'Accepted') &&
                  <>
                    <p className='pending-status'>application status: {app.status}</p>
                    <div className='link-container'>
                      <p className='confirm-link' onClick={confirmApp}>> confirm</p>
                      <p className='cancel-link' onClick={cancelApp}>> cancel</p>
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
            </>
          }
        </div>
        <div className='back-link-container'>
          <Link className='back-link' to='/'>back</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
