import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { updateApplication } from "../../store/applications";

const OrderAppsProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const params = useParams();

  const user = useSelector((state) => state.session.user);
  const apps = useSelector((state) => state.applications).list.filter(app => app.order_id == params.id);
  const order = useSelector((state) => state.orders[params.id]);

  const acceptApp = async (e) => {
    const appId = parseInt(e.target.id, 10);
    const app = await dispatch(updateApplication(appId))
  }

  const addReview = async (e) => {
    const appId = parseInt(e.target.id, 10);
    history.push(`/reviews/new/${appId}`);
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
        <div>
            <Link to='/'>back to open orders</Link>
          </div>
      </div>
    </div>
  );
};

export default OrderAppsProfile;
