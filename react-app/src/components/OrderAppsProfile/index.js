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
  let reviews = useSelector((state) => state.reviews.list);

  const getScoreAndKarma = (appNodeId) => {
    // take app.node_id and calculate score and karma
    let score = 0;
    let divisor = 0;
    let karma = 0;
    let completions = 0;
    if (reviews) {
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].reviewee_id == appNodeId) {
          score += reviews[i].score;
          if (reviews[i].score > 1) {
            karma += reviews[i].karma;
            //completions += 1;
          }
          divisor += 1;
        }
      }
      if (divisor > 0) {
        score = Math.round(10 * (score / divisor)) / 10;
      }

      return `score: ${score} | karma: ${karma}`

      // let revs = reviews.filter(rev => rev.reviewee_id == user.id);
      // reviews = revs;
    }
  }

  const acceptApp = async (e) => {
    const appId = parseInt(e.target.id, 10);
    const app = await dispatch(updateApplication(appId))
  }

  return (<>
    {(apps && order) &&
      <div className='homepage' style={{ marginTop: '100px' }}>
        <div className='page-container homepage-container'>
          <div className='homepage-feed'>
            <div className='profile-header'>
              Applications for: {order.title}
            </div>
            {apps.length > 0 ? apps.map((app) =>
              <div key={app.id} className='container apps' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div className="app-order-title">{app.node.username}</div>
              {getScoreAndKarma(app.node_id)}
                <div className="app-order-start">{app.order_start_time}</div>
                <div className="app-status">status: {app.status.toLowerCase()}</div>
                {!user.nonprofit &&
                  <button className="blue-button" id={app.id}>view details</button>
                }
                {(user.nonprofit && app.status == 'Pending') &&
                  <button className='blue-button' id={app.id} onClick={acceptApp}>accept</button>
                }
              </div>
            ) : <div style={{ marginTop: '100px' }}>no apps need attention atm</div>}
            <div className='back-link-container'>
              <Link className='back-link' to='/'>back</Link>
            </div>
          </div>
        </div>
      </div>
    }
  </>);
};

export default OrderAppsProfile;
