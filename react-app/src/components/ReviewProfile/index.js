import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ReviewProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.session.user);
  const rev = useSelector((state) => state.reviews[params.id]);

  return (
    <div className='rev-profile-container'>
      <div>
        <div className='rev-profile'>
          {rev &&
            <>
              <div style={{ marginTop: '7px' }} className='order-title'>{rev.order_title}</div>
              <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{rev.order_start_time}</div>
              <div>__________</div>
              <div className='rev-data'>
                <div style={{ marginBottom: '4px' }} className='rev-content'>"{rev.content}"</div>
                <div className='rev-writer'>– {rev.writer.username}</div>
                <div className='rev-score'>score: {rev.score}</div>
              </div>
              {(!rev.response_id && rev.writer_id != user.id) &&
                <Link className='blue-button' id={rev.application_id} to={`/reviews/new/${rev.application_id}`}>respond with review</Link>
              }
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

export default ReviewProfile;
