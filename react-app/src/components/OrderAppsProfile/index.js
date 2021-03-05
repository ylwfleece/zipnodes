import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderAppsProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const ordId = localStorage.getItem('ordId');

  const user = useSelector((state) => state.session.user);
  const order = useSelector((state) => state.orders[ordId - 1]);
  

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          {order && 
            <>
                <div>
                    {order.apps[0].node.username}
                </div>
                <div>
                    {order.app_node_ids.length}
                </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default OrderAppsProfile;
