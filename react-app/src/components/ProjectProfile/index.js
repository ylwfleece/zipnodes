import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ProjectProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const project = useSelector((state) => state.projects[params.id]);

  return (
    <div className='order-profile-container'>
      <div>
        <div className='order-profile'>
          {project && 
            <>
                <div style={{ color: 'black'}} className='order-profile-title'>
                    {project.title}
                </div>
                {/* <div style={{ color: 'rgb(155, 155, 155)' }} className='order-profile-for'>
                    {order.nonprofit_username}
                </div> */}
                <div style={{marginTop: '8px'}} className='order-desc'>
                    {project.description}
                </div>
                <div className='order-start'>
                    start time: {project.end_time}
                </div>
                <div style={{ marginTop: '4px' }} className='order-karma'>
                    millikarma per share: {project.karma_per_share}
                </div>
                <div style={{ marginTop: '4px' }} className='order-karma'>
                    cost per share: {project.cost_per_share}
                </div>
                <div style={{ marginTop: '4px' }} className='order-karma'>
                    total shares: {project.total_shares}
                </div>
                <div style={{ marginTop: '4px' }} className='order-karma'>
                    <Link to={`/purchases/new/${project.id}`}>Purchase shares</Link>
                </div>
                {/* <div className='order-status'>
                  {(order.status == 'Open') &&
                    <p className='open-status'>{order.status}</p>
                  }
                  {(order.status == 'Pending') &&
                    <p className='pending-status'>{order.status} - awaiting node confirmation</p>
                  }
                  {(order.status == 'In Progress') &&
                    <p className='pending-status'>{order.status}</p>
                  }
                  {(order.status == 'Complete') &&
                    <p className='complete-status'>{order.status}</p>
                  }
                </div> */}
                {/* {(order.status == 'Open' && !user.nonprofit) && 
                  <div className='apply-link-container'> 
                    <Link className='apply-link' to={`/applications/new/${order.id}`}>> apply</Link>
                  </div>
                } */}
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

export default ProjectProfile;
