import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const order = useSelector((state) => state.orders[0]);

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
                    {order.status}
                </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default OrderProfile;
