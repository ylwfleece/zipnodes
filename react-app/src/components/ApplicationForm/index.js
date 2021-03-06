import React, { useState } from "react";
// import {Redirect} from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createApplication, getApplications } from '../../store/applications';

const ApplicationForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const orders = useSelector((state) => state.orders);

  const orderId = useParams().orderId 
  
  let order;
  if (orders) {
    order = orders[orderId - 1];
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const app = await dispatch(createApplication(user.id, order.id));
    history.push(`/application/${app.id}`);
  };

  return (
    <div className='page-container'>
      <div className='container'>
        <div>
          <div className='form-container'>
            <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img alt='logo' style={{ padding: '5px 5rem' }} />
            </div>
            <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
              <div style={{ width: '80%' }}>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '20px', textAlign: 'center' }}>Apply to fill order:</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.title}</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.start_time}</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.location}</p>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>{order.karma}</p>
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
              {/* {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
