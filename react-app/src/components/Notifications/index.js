import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const Notifications = ({ authenticated, setAuthenticated }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const ords = useSelector(state => state.orders.list);
    const apps = useSelector(state => state.applications.list);
    const revs = useSelector(state => state.reviews.list);

    let notifs = [];
    if (ords && apps && revs) {
        if (user.nonprofit) {
            // your open order has pending apps
            // get open orders
            const openOrds = ords.filter(ord => ord.nonprofit_id == user.id && ord.status == 'Open' && ord.has_pending_apps);
            openOrds.forEach(ord => notifs.push(`${ord.title} has pending applications`));
            // your order is awaiting confirmation
            const pendingOrds = ords.filter(ord => ord.nonprofit_id == user.id && ord.status == 'Pending' && ord.has_accepted_app);
            pendingOrds.forEach(ord => notifs.push(ord.title, "is awaiting confirmation from node"));
            // your order has been confirmed
            const ipOrds = ords.filter(ord => ord.nonprofit_id == user.id && ord.status == 'In Progress' && ord.has_confirmed_app);
            ipOrds.forEach(ord => notifs.push(ord.title, "is in progress and awaiting review"))
        } else {
            // your app has been accepted
            const acceptedApps = apps.filter(app => app.node_id == user.id && app.status == 'Accepted');
            acceptedApps.forEach(app => notifs.push(`app ${app.id} awaits confirmation`));
            // you have a new review
            const newRevs = revs.filter(rev => rev.reviewee_id == user.id && !rev.response_id);
            newRevs.forEach(rev => notifs.push('new review awaits response'))
        }
    }

    return (
        <div>
            <div style={{ marginTop: '100px' }}>
                {notifs.length > 0 ? notifs.map((notif, i) =>
                    <div key={i} className='container ords'>
                        {notif}
                    </div>
                ) : <div style={{ marginTop: '100px' }}>no notifs at this time</div>}
            </div >
        </div>
    );
};

export default Notifications;
