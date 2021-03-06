import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateApplication } from "../../store/applications";

const OrderAppsProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const ordId = localStorage.getItem('ordId');

  const user = useSelector((state) => state.session.user);
  const apps = useSelector((state) => state.applications).filter(app => app.order_id == ordId);
  const order = useSelector((state) => state.orders[ordId - 1]);

  const acceptApp = async (e) => {
    const appId = parseInt(e.target.id, 10);
    const app = await dispatch(updateApplication(appId))
  }

  const addReview = async (e) => {
    const appId = parseInt(e.target.id, 10);
    localStorage.setItem("appId", appId);
    history.push('/reviews/new');
  }
  

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          {apps && 
            <div className='homepage-feed'>
            {apps.map((app) =>
                <div key={app.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                    <div>{app.node.username}</div>
                    <div>score: {app.node.score}</div>
                    <div>karma: {app.node.karma}</div>
                    <div>{app.status}</div>
                    {(user.nonprofit && app.status == 'Pending') &&
                        <button id={app.id} onClick={acceptApp}>accept</button>
                    }
                    {(user.nonprofit && app.status == 'Accepted') &&
                        <button id={app.id} onClick={addReview}>review</button>
                    }
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default OrderAppsProfile;
