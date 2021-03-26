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
          {/* render toggle bar based on user type */}
          <div className='profile-toggle-bar'>
            <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
            <button className="toggle-button" value={user.nonprofit ? "projects" : "purchases"} onClick={toggleView}>{user.nonprofit ? "projects" : "purchases"}</button>
            <button className="toggle-button" value={user.nonprofit ? "politics" : "responses"} onClick={toggleView}>{user.nonprofit ? "politics" : "responses"}</button>
          </div>
          {/* render body based on view */}
          <div className='user-profile-body'>
            {(view == 'reviews' && reviews.length > 0) && reviews.map((rev) =>
              <div key={rev.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{rev.order_title}</div>
                <div className='rev-data'>
                  <div style={{ marginBottom: '4px' }} className='rev-content'>"{rev.content}"</div>
                  <div className='user-profile-rev-writer'>– {rev.writer.username}</div>
                  <div className='rev-score'>score: {rev.score}{rev.score > 1 && `, karma gained: ${rev.karma}`}</div>
                </div>
                <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{rev.updated_at}</div>
              </div>
            )}
            {(view == 'projects' && projects.length > 0) && projects.map((proj) =>
              <div key={proj.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{proj.title}</div>
                <div className='rev-data'>
                  {/* <div style={{ marginBottom: '4px' }} className='rev-content'>"{proj.content}"</div> */}
                  {/* <div className='user-profile-rev-writer'>– {proj.writer.username}</div> */}
                  <div className='rev-score'>karma produced: {proj.karma_produced}</div>
                </div>
                <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{proj.end_time}</div>
              </div>
            )}
            {(view == 'politics' && politics.length > 0) && politics.map((pol) =>
              <div key={pol.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{pol.title}</div>
                <div className='rev-data'>
                  <div style={{ marginBottom: '4px' }} className='rev-score'>responses: {pol.responses.length}</div>
                  <div style={{ marginBottom: '4px' }} className='rev-score'>karma produced: {pol.responses.length}</div>
                  {/* <div className='user-profile-rev-writer'>– {rev.writer.username}</div>
                  <div className='rev-score'>score: {rev.score} {rev.score > 1 && `, earned karma: ${rev.karma}`}</div> */}
                </div>
                  <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{pol.end_time}</div>
              </div>
            )}
            {(view == 'purchases' && purchases.length > 0) && purchases.map((pur) =>
              <div key={pur.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{pur.project.title}</div>
                <div className='rev-data'>
                  <div style={{ fontSize: '18px'}} className='user-profile-rev-writer'>shares: {pur.num_shares}</div>
                  <div style={{ fontSize: '18px'}} className='user-profile-rev-writer'>total cost: ${(pur.num_shares * pur.project.cost_per_share).toFixed(2)}</div>
                  <div className='rev-score'>karma gained: {pur.num_shares * pur.project.millikarma_per_share / 1000}</div>
                </div>
                <div style={{ marginTop: '0px', fontSize: '18px' }} className='order-start'>{pur.created_at}</div>
              </div>
            )}
            {(view == 'responses' && responses.length > 0) && responses.map((res) =>
              <div key={res.id} className='user-profile-review' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                <div style={{ marginTop: '7px' }} className='order-title'>{res.politic_question}</div>
                <div style={{ marginTop: '7px' }} className='rev-score'>{res.answer}ay</div>
                <div style={{ marginTop: '5px' }} className='rev-score'>karma gained: 1</div>
                <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{res.created_at}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    }
  </div>

  );
};

export default UserProfile;
