import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateApplication } from "../../store/applications";
import { updateOrder } from "../../store/orders";

const UserProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [load, setLoad] = useState(false);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  let reviews = useSelector((state) => state.reviews.list);
  const applications = useSelector((state) => state.applications.list);
  const orders = useSelector((state) => state.orders.list);

  // for np
  // get reviews with nonprofit id 

  // for node
  // get reviews where with writer or reviewee id


  let score = 0;
  let divisor = 0;
  let karma = 0;
  let completions = 0;
  if (reviews) {
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].reviewee_id == user.id) {
        score += reviews[i].score;
        if (reviews[i].score > 1) {
          karma += reviews[i].karma;
          completions += 1;
        }
        divisor += 1;
      }
    }
    if (divisor > 0) {
      score = Math.round(10 * (score / divisor)) / 10;
    }

    let revs = reviews.filter(rev => rev.reviewee_id == user.id);
    reviews = revs;
  }

  return (<div>
    {(user && reviews) &&
      <div>
        <div className='profile-page-container'>
          <div className='header-container'>
            <div className='user-profile-name'>
              {user.username}
            </div>
            <div className='user-profile-score'>
              score: {score}
            </div>
            <div className='user-profile-karma'>
              karma: {karma}
            </div>
            <div className='user-profile-completions'>
              orders completed: {completions}
            </div>
          </div>
          <div className='user-profile-body'>
            {reviews.length > 0 ? reviews.map((rev) =>
              <div key={rev.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{rev.order_title}</div>
                <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{rev.order_start_time}</div>
                <div className='rev-data'>
                  <div style={{ marginBottom: '4px' }} className='rev-content'>"{rev.content}"</div>
                  <div className='user-profile-rev-writer'>– {rev.writer.username}</div>
                  <div className='rev-score'>score: {rev.score}</div>
                </div>
              </div>
            ) : <div style={{ marginTop: '100px' }}>no reviews yet</div>}
          </div>
        </div>
      </div>
    }
  </div>

  );
};

export default UserProfile;
