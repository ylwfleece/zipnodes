import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ApplicationProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const application = useSelector((state) => state.applications[params.id]);

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          {application &&
            <>
              <div>
                {application.order_title}
              </div>
              <div>
                {application.order_start_time}
              </div>
              <div>
                {application.status}
              </div>

            </>
          }
          <div>
            <Link to='/'>back to open orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
