import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const UserProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  //const order = useSelector((state) => state.orders[params.id]);
  const reviews = useSelector((state) => state.reviews.list);
  const applications = useSelector((state) => state.applications.list);

  let score = 0;
  let divisor = 0;
  let karma = 0;
  if (reviews) {
    for (let i=0; i<reviews.length; i++) {
      if (reviews[i].reviewee_id == user.id) {
        score += reviews[i].score;
        if (reviews[i].score > 1) {
          karma += reviews[i].karma;
        }
        divisor += 1;
      }
    }
    if (divisor > 0) {
      score = Math. round(10*(score/divisor))/10;
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
      </div>
    </div>
    

  );
};

export default UserProfile;
