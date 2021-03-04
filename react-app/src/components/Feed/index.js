import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

function Feed() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const orders = useSelector((state) => state.orders)
    const applications = useSelector((state) => state.applications)
    const reviews = useSelector((state) => state.reviews)

    let applicationsArr = [];
    if (applications) {
        applicationsArr = applications.filter(app => app.node_id === user.id);
    }



    return (<>
        {orders &&
            <div className='homepage'>
                <div className='page-container homepage-container'>
                    <div className='homepage-feed'>
                        {orders.map((order) =>
                            <div key={order.id} className='container posts' style={{ paddingTop: '0', marginBottom: '5vh' }}>
                                <div>{order.title}</div>
                                <div>{order.description}</div>
                                <div>starts: {order.start_time}</div>
                                <div>virtual: {order.virtual.toString()}</div>
                                <div>karma: {order.karma}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
    </>)
}

export default Feed
