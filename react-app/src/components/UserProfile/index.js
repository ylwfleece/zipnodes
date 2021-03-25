import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateApplication } from "../../store/applications";
import { updateOrder } from "../../store/orders";

const UserProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  let reviews = useSelector((state) => state.reviews.list);
  let projects = useSelector((state) => state.projects.list);
  let politics = useSelector((state) => state.politics.list);
  let purchases = useSelector((state) => state.purchases.list);
  let responses = useSelector((state) => state.responses.list);

  const [view, setView] = useState("reviews");
  const toggleView = (e) => {
    setView(e.target.value);
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // CALCULATING TOP BAR STATS AND DETERMINING RENDERED ELEMENTS ///////
  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // define variables for top bar stats
  let score = 0;
  let divisor = 0;
  let karma = 0;
  let ordersCompleted = 0;
  let projectsCompleted = 0;
  let politicsCompleted = 0;
  let purchasesCompleted = 0;
  let responsesCompleted = 0;
  // calculate stats from reviews, projects/purchases and politics/responses
  if (reviews) {
    // loop through reviews, if the user is reviewee then factor in review score and karma
    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].reviewee_id == user.id && reviews[i].score != 9) {
        // add to accum score
        score += reviews[i].score;
        // add to karma and ordersCompleted
        if (reviews[i].score > 1) {
          karma += reviews[i].karma;
          ordersCompleted += 1;
        }
        // add to divisor for score
        divisor += 1;
      }
    }
    // divide by divisor to calculate score
    if (divisor > 0) {
      score = Math.round(10 * (score / divisor)) / 10;
    }
    // filter reviews for rendering in profile body
    let revs = reviews.filter(rev => rev.reviewee_id == user.id && rev.score != 9);
    reviews = revs;
    // add purchase and response karma 
    if (!user.nonprofit) {
      karma += (user.purchase_karma + user.response_karma);
    } else {
      // get purchase and response karma for nonprofit
      // all purchases for all projects 
      // all responses for all politics
    }
  }
  // get store objects for node
  if (!user.nonprofit && purchases && responses) {
    // filter purchases and responses by node_id and status
    purchases = purchases.filter(pur => pur.node.id == user.id);
    responses = responses.filter(res => res.node.id == user.id);
    // set top bar stats
    purchasesCompleted = purchases.length;
    responsesCompleted = responses.length;
  } else if (user.nonprofit && projects && politics) {
    // filter projects and politics by nonprofit_id and status
    projects = projects.filter(proj => proj.nonprofit.id == user.id && proj.status);
    politics = politics.filter(pol => pol.nonprofit.id == user.id && pol.status);
    // set top bar stats
    projectsCompleted = projects.length;
    politicsCompleted = politics.length;
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
              orders completed: {ordersCompleted}
            </div>
            {user.nonprofit ?
              <>
                <div className='user-profile-completions'>
                  projects completed: {projectsCompleted}
                </div>
                <div className='user-profile-completions'>
                  politics completed: {politicsCompleted}
                </div>
              </>
              :
              <>
                <div className='user-profile-completions'>
                  purchases: {purchasesCompleted}
                </div>
                <div className='user-profile-completions'>
                  responses: {responsesCompleted}
                </div>
              </>
            }
          </div>
          {/* render toggle bar and body based on user and view */}
          <div className='profile-toggle-bar'>
            <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
            <button className="toggle-button" value={user.nonprofit ? "projects" : "purchases"} onClick={toggleView}>{user.nonprofit ? "projects" : "purchases"}</button>
            <button className="toggle-button" value={user.nonprofit ? "politics" : "responses"} onClick={toggleView}>{user.nonprofit ? "politics" : "responses"}</button>
          </div>
          <div className='user-profile-body'>
            {reviews.length > 0 ? reviews.map((rev) =>
              <div key={rev.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{rev.order_title}</div>
                <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{rev.order_start_time}</div>
                <div className='rev-data'>
                  <div style={{ marginBottom: '4px' }} className='rev-content'>"{rev.content}"</div>
                  <div className='user-profile-rev-writer'>– {rev.writer.username}</div>
                  <div className='rev-score'>score: {rev.score} {rev.score > 1 && `, earned karma: ${rev.karma}`}</div>
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
