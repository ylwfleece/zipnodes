import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createReview, getReviews } from '../../store/reviews';
import { getApplications } from "../../store/applications";

const ReviewForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const appId = useParams().appId;
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews).list.filter(rev => rev.app_id == appId)[0]
  let responseId = null;
  if (review) {
    responseId = review.id;
  }
  
  const [content, setContent] = useState("");
  const [score, setScore] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const rev = await dispatch(createReview(user.id, appId, content, score, responseId));
    dispatch(getApplications())
    history.push(`/review/${rev.id}`);
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const updateScore = (e) => {
    setScore(e.target.value);
  };

  return (
    <div className='page-container'>
      <div className='container'>
        <div>
          <div className='form-container'>
            <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img alt='logo' style={{ padding: '5px 5rem' }} />
            </div>
            <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
              <div style={{ width: '80%' }}>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>Write a review.</p>
              </div>
            </div>
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <form onSubmit={onSubmit}>
                <div className='field-inputs'>
                  <input
                    type="textarea"
                    name="content"
                    placeholder='content'
                    onChange={updateContent}
                    value={content}
                  />
                </div>
                <div className='field-inputs'>
                  <input
                    type="number"
                    name="score"
                    placeholder='score'
                    onChange={updateScore}
                    value={score}
                  />
                </div>
                <div className='submit-button-container' style={{ marginTop: '18px' }}>
                  <button type="submit" className='blue-submit-button'>Submit Review</button>
                </div>
              </form>
            </div>
            <div className='errors-container'>
              {/* {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
