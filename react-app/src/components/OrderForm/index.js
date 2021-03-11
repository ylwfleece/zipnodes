import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from '../../store/orders';
import DateTimePicker from 'react-datetime-picker'
import logo from '../auth/zipnodes_logo.png';

const OrderForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [karma, setKarma] = useState("");
  const [virtual, setVirtual] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const order = await dispatch(createOrder(user.id, title, description, location, startTime, duration, karma, virtual));
    history.push(`/order/${order.id}`)
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  };

  const updateStartTime = (e) => {
    console.log(e)
    setStartTime(e);
  };

  const updateDuration = (e) => {
    setDuration(e.target.value);
  };

  const updateKarma = (e) => {
    setKarma(e.target.value);
  };

  const updateVirtual = (e) => {
    setVirtual(e.target.checked);
  };


  return (
    <div className='page-container'>
      <div className='container'>
        <div>
          <div className='order-form-container'>
            <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={logo} alt='logo' style={{ padding: '5px 5rem' }} />
            </div>
            {/* <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
              <div style={{ width: '80%' }}>
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '16px', textAlign: 'center' }}>Create a new order</p>
              </div>
            </div> */}
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <form onSubmit={onSubmit}>
                <div className='field-inputs' style={{height: '50px'}}>
                <textarea
                    style={{padding: '2px', height: '100%', width: '100%', resize: 'none', border: 'none', backgroundColor: 'rgb(250, 250, 250)'}}
                    onChange={updateTitle}
                    value={title}
                    placeholder='title'
                  >
                    
                  </textarea>
                </div>
                <div className='field-inputs' style={{height: '80px'}}>
                  <textarea
                    style={{padding: '2px', height: '100%', width: '100%', resize: 'none', border: 'none', backgroundColor: 'rgb(250, 250, 250)'}}
                    onChange={updateDescription}
                    value={description}
                    placeholder='description'
                  >
                    
                  </textarea>
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="location"
                    placeholder='location'
                    onChange={updateLocation}
                    value={location}
                  />
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="duration"
                    placeholder='duration'
                    onChange={updateDuration}
                    value={duration}
                  />
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="karma"
                    placeholder='karma'
                    onChange={updateKarma}
                    value={karma}
                  />
                </div>
                <p style={{ alignContent: 'center'}}>check for virtual event: </p>
                <div className='field-inputs'>
                  {/* <label style={{ padding: '2px', marginTop: '4px' }} htmlFor="virtual">virtual: </label> */}
                  <input
                    type="checkbox"
                    name="virtual"
                    placeholder='virtual'
                    onChange={updateVirtual}
                    value={virtual}
                  />
                </div>
                <DateTimePicker 
                      onChange={updateStartTime}
                      value={startTime}
                    />
                <div className='submit-button-container' style={{ marginTop: '18px' }}>
                  <button type="submit" className='blue-submit-button'>Submit Order</button>
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

export default OrderForm;
