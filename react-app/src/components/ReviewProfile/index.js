import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ReviewProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews[params.id]);

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          {review && 
            <>
                <div>
                    {review.content}
                </div>
                <div>
                    {review.score}
                </div>
            </>
          }
        </div>
        <div>
            <Link to='/'>back to open orders</Link>
          </div>
      </div>
    </div>
  );
};

export default ReviewProfile;
