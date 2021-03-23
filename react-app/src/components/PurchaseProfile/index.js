import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplicationProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notify = (msg) => toast(msg);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const purchase = useSelector((state) => state.purchases[params.id]);

  return (
    <div className='app-profile-container'>
      <div>
        {purchase &&
          <div className='app-profile'>
            <div className='app-order-title'>
              <Link to={`/project/${purchase.project.id}`}>{purchase.project.title} for {purchase.project.nonprofit.username}</Link>
            </div>
            <div className='app-order-start'>
              number of shares purchased: {purchase.num_shares}
            </div>
            <div className='app-order-start'>
              {purchase.created_at}
            </div>
            <div className='app-order-location'>
              status: {purchase.project.status}
            </div>
            {/* {user.nonprofit &&
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
              } */}
              {/* {(app.status == 'Accepted') &&
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
              } */}
            </div>
        }
      <div style={{ marginLeft: '0px'}} className='back-link-container'>
        <Link className='back-link' to={`/`}>back</Link>
      </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
