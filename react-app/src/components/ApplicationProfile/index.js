import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ApplicationProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const app = useSelector((state) => state.applications[params.id]);

  const confirmApp = (e) => {
    // dispatch to update app to confirmed and order to inprogress
    
  }

  const cancelApp = (e) => {
    // dispatch to destroy app and order back to open
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
              <div className='app-status'>
                {(app.status == 'Pending') &&
                  <>
                    <p className='open-status'>status: {app.status}</p>
                    <div className='link-container'>
                      <Link className='cancel-link' to={`/`}>> cancel</Link>
                    </div>
                  </>
                }
                {(app.status == 'Accepted') &&
                  <>
                    <p className='pending-status'>application status: {app.status}</p>
                    <div className='link-container'>
                      <Link className='confirm-link' to={`/`} onClick={confirmApp}>> confirm</Link>
                    </div>
                    <div className='link-container'>
                      <Link className='cancel-link' to={`/`} onClick={cancelApp}>> cancel</Link>
                    </div>
                  </>
                }
                {(app.status == 'Confirmed') &&
                  <p className='complete-status'>{app.status}</p>
                }
              </div>
            </>
          }
        </div>
        <div className='back-link-container'>
          <Link className='back-link' to='/'>back to open orders</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
