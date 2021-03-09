import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const OrderProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const order = useSelector((state) => state.orders[params.id]);

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          {order && 
            <>
                <div>
                    {order.title}
                </div>
                <div>
                    {order.description}
                </div>
                <div>
                    {order.start_time}
                </div>
                <div>
                    {order.location}
                </div>
                <div>
                    {order.virtual}
                </div>
                <div>
                    {order.karma}
                </div>
                <div>
                    {order.status}
                </div>
                <div>
                  <Link to={`/applications/new/${order.id}`}>apply</Link>
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

export default OrderProfile;
