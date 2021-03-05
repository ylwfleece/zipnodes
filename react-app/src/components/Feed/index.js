import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { updateApplication } from "../../store/applications";
import { createReview, getReviews } from '../../store/reviews';

function Feed() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const orders = useSelector((state) => state.orders)
    const applications = useSelector((state) => state.applications)
    const reviews = useSelector((state) => state.reviews)

    const [view, setView] = useState("orders");

    const toggleView = (e) => {
        setView(e.target.value);
    }

    let ords = [];
    if (orders && user) {
        if (user.nonprofit) {
            ords = orders.filter(ord => ord.status == "Unfilled")
        } else {
            ords = orders.filter(ord => (ord.status == "Unfilled" && !ord.app_node_ids.includes(user.id)))
        }
    }

    let apps = [];
    if (applications && user) {
        if (user.nonprofit) {
            apps = applications.filter(app => app.nonprofit_id == user.id);
        } else {
            apps = applications.filter(app => app.node_id == user.id);
        }
    }
    
    let revs = [];
    if (reviews && user) {
        if (user.nonprofit) {
            revs = reviews.filter(rev => rev.nonprofit_id == user.id);
        } else {
            revs = reviews.filter(rev => rev.node_id == user.id);
        }
    }

    const openApp = (e) => {
        const orderId = parseInt(e.target.id, 10);
        localStorage.setItem("orderId", orderId);
        history.push('/applications/new');
    }

    const accept = (e) => {
        const appId = parseInt(e.target.id, 10);
        dispatch(updateApplication(appId));
        // remove option to accept other apps for same order
    }

    const addReview = (e) => {
        const appId = parseInt(e.target.id, 10);
        localStorage.setItem("appId", appId);
        history.push('/reviews/new');
        // remove option to accept other apps for same order
    }

    const viewApps = (e) => {
        const ordId = parseInt(e.target.id, 10);
        localStorage.setItem("ordId", ordId);
        history.push(`/order/${ordId}/apps`);
    }

    return (<>
        {(view == "orders" && ords) &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='toggle-bar'>
                        <button value="orders" onClick={toggleView}>orders</button>
                        <button value="applications" onClick={toggleView}>applications</button>
                        <button value="reviews" onClick={toggleView}>reviews</button>
                    </div>
                    <div className='homepage-feed'>
                        {ords.map((ord) =>
                            <div key={ord.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{ord.title}</div>
                                <div>{ord.description}</div>
                                <div>starts: {ord.start_time}</div>
                                <div>virtual: {ord.virtual.toString()}</div>
                                <div>karma: {ord.karma}</div>
                                {!user.nonprofit && 
                                    <button id={ord.id} onClick={openApp}>apply</button>
                                }
                                {(user.nonprofit && ord.app_node_ids.length > 0) && 
                                    <>
                                        <p>applications: {ord.app_node_ids.length}</p>
                                        <button id={ord.id} onClick={viewApps}>view</button>
                                    </>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
        {(view == "applications" && apps) &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='toggle-bar'>
                        <button value="orders" onClick={toggleView}>orders</button>
                        <button value="applications" onClick={toggleView}>applications</button>
                        <button value="reviews" onClick={toggleView}>reviews</button>
                    </div>
                    <div className='homepage-feed'>
                        {apps.map((app) =>
                            <div key={app.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{app.node_id}</div>
                                <div>{app.status}</div>
                                {(user.nonprofit && app.status == 'Pending') &&
                                    <button id={app.id} onClick={accept}>accept</button>
                                }
                                {(user.nonprofit && app.status == 'Accepted') &&
                                    <button id={app.id} onClick={addReview}>review</button>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
        {(view == "reviews" && revs) &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='toggle-bar'>
                        <button value="orders" onClick={toggleView}>orders</button>
                        <button value="applications" onClick={toggleView}>applications</button>
                        <button value="reviews" onClick={toggleView}>reviews</button>
                    </div>
                    <div className='homepage-feed'>
                        {revs.map((rev) =>
                            <div key={rev.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{rev.content}</div>
                                <div>{rev.score}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
    </>)
}

export default Feed
