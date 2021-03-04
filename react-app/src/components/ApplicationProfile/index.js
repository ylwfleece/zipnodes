import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApplicationProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const application = useSelector((state) => state.applications[0]);

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          {application && 
            <div>
                {application.status}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
