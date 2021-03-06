import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
