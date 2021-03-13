import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const OrderProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const order = useSelector((state) => state.orders[params.id]);

  return (
    <div className='order-profile-container'>
      <div>
        <div className='order-profile'>
          {order && 
            <>
                <div className='order-title'>
                    {order.title}
                </div>
                <div className='order-desc'>
                    {order.description}
                </div>
                <div className='order-start'>
                    start time: {order.start_time}
                </div>
                <div className='order-location'>
                    location: {order.location}
                </div>
                {order.virtual &&
                  <div className='order-virtual'> 
                    (virtual)
                  </div>
                }
                <div className='order-karma'>
                    karma: {order.karma}
                </div>
                <div className='order-status'>
                  {(order.status == 'Open') &&
                    <p className='open-status'>{order.status}</p>
                  }
                  {(order.status == 'Pending' || order.status == 'In Progress') &&
                    <p className='pending-status'>{order.status}</p>
                  }
                  {(order.status == 'Complete') &&
                    <p className='complete-status'>{order.status}</p>
                  }
                </div>
                {(order.status == 'Open' && !user.nonprofit) && 
                  <div className='apply-link-container'> 
                    <Link className='apply-link' to={`/applications/new/${order.id}`}>> apply</Link>
                  </div>
                }
            </>
          }
        </div>
        <div className='back-link-container'>
            <Link className='back-link'to='/'>back</Link>
          </div>
      </div>
    </div>
  );
};

export default OrderProfile;
