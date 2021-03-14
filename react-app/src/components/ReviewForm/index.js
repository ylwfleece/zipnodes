import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createReview, getReviews } from '../../store/reviews';
import { getApplications } from "../../store/applications";
import { getOrders } from "../../store/orders";
import logo from "../auth/zipnodes_logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notify = (msg) => toast(msg);

  const appId = useParams().appId;
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews).list.filter(rev => rev.application_id == appId)[0]
  const app = useSelector((state) => state.applications)[appId];
  let responseId = null;
  if (review) {
    responseId = review.id;
    console.log(responseId);
  } 

  const [content, setContent] = useState("");
  const [score, setScore] = useState("");

  const onSubmit = async (e) => {
    console.log('in submit')
    e.preventDefault();
    let revieweeId;
    if (user.nonprofit) {
      revieweeId = app.node_id;
    } else {
      revieweeId = app.nonprofit_id;
    }
    const rev = await dispatch(createReview(user.id, revieweeId, appId, content, score, responseId));
    console.log(rev);
    notify("Successfully reviewed: " + app.order_title);
    dispatch(getApplications());
    history.push(`/review/${rev.id}`);
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const updateScore = (e) => {
    setScore(e.target.value);
  };

  return (
    <>
      {app &&
        <div className='page-container'>
          <div className='container'>
            <div>
              <div className='review-form-container'>
                <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <img src={logo} alt='logo' style={{ padding: '5px 5rem' }} />
                </div>
                <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
                  <div style={{ width: '80%' }}>
                    <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>Write a review for: {app.order_title}</p>
                  </div>
                </div>
                <div className='flex-container' style={{ justifyContent: 'center', width: '25%'}}>
                  <form onSubmit={onSubmit}>
                    <div className='field-inputs'>
                      <textarea
                        style={{padding: '2px', height: '100%', width: '100%', resize: 'none', border: 'none', backgroundColor: 'rgb(250, 250, 250)'}}
                        placeholder='content'
                        onChange={updateContent}
                        value={content}
                        maxLength='225' minLength='1'
                      >
                        </textarea>
                    </div>
                    <div style={{width: '25%'}} className='field-inputs'>
                      <input
                        type="number"
                        name="score"
                        placeholder='score'
                        onChange={updateScore}
                        value={score}
                        min="1" max="5"
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
      }
    </>
  );
};

export default ReviewForm;
