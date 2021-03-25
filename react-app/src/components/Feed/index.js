import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

function Feed() {
    const dispatch = useDispatch()
    const history = useHistory();

    const user = useSelector((state) => state.session.user)
    const orders = useSelector((state) => state.orders)
    const applications = useSelector((state) => state.applications)
    const reviews = useSelector((state) => state.reviews)
    const projects = useSelector((state) => state.projects)
    const politics = useSelector((state) => state.politics)

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

    let pols = [];
    if (politics.list && user) {
        if (user.nonprofit) {
            pols = politics.list.filter(pol => pol.nonprofit_id == user.id);
        } else {
            pols = politics.list.filter(pol => pol.status == 'Open');
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

    const viewPoliticProfile = (e) => {
        const polId = parseInt(e.target.id, 10);
        history.push(`/politic/${polId}`);
    }

    return (<>
        {(view == "orders" && ords && user) &&
            <div className='homepage' style={{ marginTop: '120px' }}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="projects" onClick={toggleView}>projects</button>
                    <button className="toggle-button" value="politics" onClick={toggleView}>politics</button>                
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
        {(view == "projects" && projs && user) &&
            <div className='homepage' style={{ marginTop: '120px' }}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="projects" onClick={toggleView}>projects</button>
                    <button className="toggle-button" value="politics" onClick={toggleView}>politics</button>                 
                </div>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {projs.length > 0 ? projs.map((proj) =>
                            <div key={proj.id} className='container ords'>
                                <div className="order-title">{proj.title}</div>
                                {/* <div style={{ marginBottom: '0px', fontStyle: 'italic' }} className="order-start">closes {proj.end_time}</div> */}
                                <div className="order-karma">{proj.millikarma_per_share} millikarma</div>
                                <div className="order-karma">${proj.cost_per_share}</div>
                                {!user.nonprofit && 
                                    <button className="blue-button" id={proj.id} onClick={viewProjectProfile}>view details</button>
                                }
                            </div>
                        ) : <div style={{marginTop: '100px'}}>no open projects at this time</div>}
                    </div>
                </div>
            </div>
        }
        {(view == "politics" && pols && user) &&
            <div className='homepage' style={{ marginTop: '120px' }}>
                <div className='toggle-bar'>
                    <button className="toggle-button" value="orders" onClick={toggleView}>orders</button>
                    <button className="toggle-button" value="projects" onClick={toggleView}>projects</button>
                    <button className="toggle-button" value="politics" onClick={toggleView}>politics</button>                 
                </div>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {pols.length > 0 ? pols.map((pol) =>
                            <div key={pol.id} className='container ords'>
                                <div style={{paddingLeft: '15px', paddingRight: '15px'}} className="order-title">{pol.title}</div>
                                <div style={{ marginBottom: '0px', fontStyle: 'italic' }} className="order-start">{pol.question}</div>
                                {!user.nonprofit && 
                                    <button style={{marginTop: '5px'}} className="blue-button" id={pol.id} onClick={viewPoliticProfile}>view details</button>
                                }
                            </div>
                        ) : <div style={{marginTop: '100px'}}>no open politics at this time</div>}
                    </div>
                </div>
            </div>
        }
    </>)
}

export default Feed
