import React, { useState } from "react";
// import {Redirect} from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createApplication, getApplications } from '../../store/applications';
import { getOrders } from "../../store/orders";
import logo from "../auth/zipnodes_logo.png"

const ApplicationForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const params = useParams();
  const order = useSelector((state) => state.orders[params.orderId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const app = await dispatch(createApplication(user.id, order.id));
    dispatch(getOrders());
    history.push(`/application/${app.id}`);
  };

  return (
    
    <div className='page-container'>
      {order &&
      <div className='container'>
        <div>
          <div className='application-form-container'>
            {/* <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={logo} alt='logo' style={{ padding: '5px 5rem', width: '10px', height: '10px' }} />
            </div> */}
            <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
              <div style={{ width: '80%' }}>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '20px', textAlign: 'center' }}>Apply to fill order:</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.title}</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.start_time}</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.location}</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>karma: {order.karma}</p>
              </div>
            </div>
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <form onSubmit={onSubmit}>
                <div className='submit-button-container' style={{ marginTop: '18px' }}>
                  <button type="submit" className='blue-submit-button'>Submit Application</button>
                </div>
              </form>
            </div>
            <div className='errors-container'>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
};

export default ApplicationForm;
