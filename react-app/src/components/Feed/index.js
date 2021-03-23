import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
// import { getApplications } from "../../store/applications";
// import { getOrders } from "../../store/orders";
// import { getProjects } from "../../store/projects";
// import { getPurchases } from "../../store/purchases";
import { createReview, getReviews } from '../../store/reviews';
import { updateOrder } from "../../store/orders";

function Feed() {
    const dispatch = useDispatch()
    const history = useHistory();

    // dispatch(getOrders());
    // dispatch(getApplications());
    // dispatch(getProjects());
    // dispatch(getPurchases());

    const user = useSelector((state) => state.session.user)
    const orders = useSelector((state) => state.orders)
    const applications = useSelector((state) => state.applications)
    const reviews = useSelector((state) => state.reviews)
    const projects = useSelector((state) => state.projects)

    const [view, setView] = useState("orders");

    const toggleView = (e) => {
        setView(e.target.value);
    }

    let ords = [];
    if (orders.list && user) {
        if (user.nonprofit) {
            ords = orders.list.filter(ord => ord.status != "Complete" && ord.nonprofit_id == user.id)
        } else {
            ords = orders.list.filter(ord => (ord.status == "Open" && !ord.app_node_ids.includes(user.id)))
        }
    }

    let apps = [];
    if (applications.list && user && orders.list) {
        if (user.nonprofit) {
            apps = applications.list.filter(app => app.nonprofit_id == user.id && orders[app.order_id].status != "Complete");
        } else {
            apps = applications.list.filter(app => app.node_id == user.id);
        }
    }
    
    let revs = [];
    if (reviews.list && user) {
        if (user.nonprofit) {
            // revs = reviews.list.filter(rev => rev.nonprofit_id == user.id);
        } else {
            revs = reviews.list.filter(rev => rev.reviewee_id == user.id && !rev.response_id && rev.score > 1);
        }
    }

    let projs = [];
    if (projects.list && user) {
        if (user.nonprofit) {
            projs = projects.list.filter(proj => proj.nonprofit_id == user.id);
        } else {
            projs = projects.list.filter(proj => proj.status == 'Open');
        }
    }


    const viewOrderProfile = (e) => {
        const orderId = parseInt(e.target.id, 10);
        history.push(`/order/${orderId}`);
    }

    const addReview = (e) => {
        const appId = parseInt(e.target.id, 10);
        history.push(`/reviews/new/${appId}`);
    }

    const viewApps = (e) => {
        const ordId = parseInt(e.target.id, 10);
        history.push(`/order/${ordId}/apps`);
    }

    const viewAppProfile = (e) => {
        const appId = parseInt(e.target.id, 10);
        history.push(`/application/${appId}`);
    }

    const viewProjectProfile = (e) => {
        const projId = parseInt(e.target.id, 10);
        history.push(`/project/${projId}`);
    }

    return (<>
        {(view == "orders" && ords && user) &&
            <div className='homepage' style={{ marginTop: '120px' }}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="projects" onClick={toggleView}>projects</button>
                    <button className="toggle-button" value="bills" onClick={toggleView}>bills</button>                
                </div>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {ords.length > 0 ? ords.map((ord) =>
                            <div key={ord.id} className='container ords'>
                                <div className="order-title">{ord.title} {ord.virtual && "(virtual)"}</div>
                                {!user.nonprofit && 
                                    <div className="order-for">{ord.nonprofit_username} </div>                              
                                }
                                <div style={{ marginBottom: '0px', fontStyle: 'italic' }} className="order-start">{ord.start_time}</div>
                                <div className="order-karma">{ord.karma} karma</div>
                                {!user.nonprofit && 
                                    <button className="blue-button" id={ord.id} onClick={viewOrderProfile} >view details</button>
                                }
                                {(user.nonprofit && ord.app_node_ids.length == 1) && 
                                    <button className='blue-button' id={ord.id} onClick={viewApps}>view {ord.app_node_ids.length} application</button>
                                }
                                {(user.nonprofit && ord.app_node_ids.length > 1) && 
                                    <button className='blue-button' id={ord.id} onClick={viewApps}>view {ord.app_node_ids.length} applications</button>
                                }
                                {(user.nonprofit && ord.app_node_ids.length == 0) && 
                                    <p style={{ fontSize: '16px' }}id={ord.id}>no open apps</p>
                                }
                            </div>
                        ) : <div style={{marginTop: '100px'}}>no open orders at this time</div>}
                    </div>
                </div>
            </div>
        }
        {/* {(view == "applications" && apps) &&
            <div className='homepage' style={{ marginTop: '120px'}}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="applications" onClick={toggleView}>applications</button>
                    <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
                </div>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {apps.length > 0 ? apps.map((app) =>
                            <div key={app.id} className='container apps' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div className="app-order-title">{app.order_title}</div>
                                <div className="app-order-start">{app.order_start_time}</div>
                                <div className="app-status">status: {app.status.toLowerCase()}</div>
                                {!user.nonprofit && 
                                    <button className="blue-button" id={app.id} onClick={viewAppProfile}>view details</button>
                                }
                                {(user.nonprofit) &&
                                    <button className="blue-button" id={app.id} onClick={viewAppProfile}>view details</button>
                                }
                            </div>
                        ) : <div style={{marginTop: '100px'}}>no apps currently need attention</div>}
                    </div>
                </div>
            </div>
        } */}
        {/* {(view == "reviews" && revs) &&
            <div className='homepage' style={{ marginTop: '120px'}}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="applications" onClick={toggleView}>applications</button>
                    <button className="toggle-button" value="reviews" onClick={toggleView}>reviews</button>
                </div>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {revs.length > 0 ? revs.map((rev) => 
                            <div key={rev.id} className='container revs' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div style={{ marginTop: '7px' }} className='order-title'>{rev.order_title}</div>
                                <div style={{ marginTop: '2px', fontSize: '18px' }} className='order-start'>{rev.order_start_time}</div>
                                <div>__________</div>
                                <div className='rev-data'>
                                    <div style={{ marginBottom: '4px'}}className='rev-content'>"{rev.content}"</div>
                                    <div className='rev-writer'>– {rev.writer.username}</div>
                                    <div className='rev-score'>score: {rev.score}</div>
                                </div>
                                {(!rev.response_id && rev.writer_id != user.id) && 
                                    <button className='blue-button' id={rev.application_id} onClick={addReview}>respond with review</button>
                                }
                            </div>
                        ) : <div style={{marginTop: '100px', fontSize: '16px'}}>no reviews currently need attention</div>}
                    </div>
                </div>
            </div>
        } */}
        {(view == "projects" && projs && user) &&
            <div className='homepage' style={{ marginTop: '120px' }}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="projects" onClick={toggleView}>projects</button>
                    <button className="toggle-button" value="bills" onClick={toggleView}>bills</button>                 
                </div>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {projs.length > 0 ? projs.map((proj) =>
                            <div key={proj.id} className='container ords'>
                                <div className="order-title">{proj.title}</div>
                                {/* {!user.nonprofit && 
                                    <div className="order-for">{ord.nonprofit_username} </div>                              
                                } */}
                                <div style={{ marginBottom: '0px', fontStyle: 'italic' }} className="order-start">{proj.end_time}</div>
                                <div className="order-karma">{proj.karma_per_share} karma per share</div>
                                <div className="order-karma">${proj.cost_per_share} cost per share</div>
                                {!user.nonprofit && 
                                    <button className="blue-button" id={proj.id} onClick={viewProjectProfile}>view details</button>
                                }
                                {/* {(user.nonprofit && ord.app_node_ids.length == 1) && 
                                    <button className='blue-button' id={ord.id} onClick={viewApps}>view {ord.app_node_ids.length} application</button>
                                }
                                {(user.nonprofit && ord.app_node_ids.length > 1) && 
                                    <button className='blue-button' id={ord.id} onClick={viewApps}>view {ord.app_node_ids.length} applications</button>
                                }
                                {(user.nonprofit && ord.app_node_ids.length == 0) && 
                                    <p style={{ fontSize: '16px' }}id={ord.id}>no open apps</p>
                                } */}
                            </div>
                        ) : <div style={{marginTop: '100px'}}>no open projects at this time</div>}
                    </div>
                </div>
            </div>
        }
    </>)
}

export default Feed
