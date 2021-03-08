import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const UserProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const reviews = useSelector((state) => state.reviews.list);
  const applications = useSelector((state) => state.applications.list);

  let apps = [];
  if (applications) {
    apps = applications.filter(app => app.node_id == user.id);
  }
  // const applications = useSelector((state) => state.applications.list).filter(app => app.node_id == user.id && app.status == "Complete");

  // const orders = useSelector((state) => state.applications.list);
  let score = 0;
  let divisor = 0;
  let karma = 0;
  if (reviews) {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].reviewee_id == user.id) {
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

  return (
    <div className='page-container homepage-container'>
      <div>
        <div className='container'>
          {(user && reviews) &&
            <>
              <div>
                {user.username}
              </div>
              <div>
                score: {score}
              </div>
              <div>
                karma: {karma}
              </div>
            </>
          }
        </div>
        <div className='container'>
          {(user && applications) &&
            <>
              <div style={{ paddingBottom: '0', marginBottom: '2vh' }}># orders filled: {applications.length}</div>
              {apps.map((app) =>
                <div key={app.id} className='container posts' style={{ paddingTop: '0', marginBottom: '3vh' }}>
                  <div>{app.order_title}</div>
                  <div>{app.node.username}</div>
                  <div>{app.order_start_time}</div>                 
                </div>
              )}
            </>
          }
        </div>
      </div>
    </div>


  );
};

export default UserProfile;
