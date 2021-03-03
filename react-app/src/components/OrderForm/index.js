import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from '../../store/orders';

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
    dispatch(createOrder(user.id, title, description, location, startTime, duration, karma, virtual));
    // history.push('/')
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
    setStartTime(e.target.value);
  };

  const updateDuration = (e) => {
    setDuration(e.target.value);
  };

  const updateKarma = (e) => {
    setKarma(e.target.value);
  };

  const updateVirtual = (e) => {
    setVirtual(e.target.value);
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
                <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px', textAlign: 'center' }}>Create a new order.</p>
              </div>
            </div>
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <form onSubmit={onSubmit}>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="title"
                    placeholder='title'
                    onChange={updateTitle}
                    value={title}
                  />
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="description"
                    placeholder='description'
                    onChange={updateDescription}
                    value={description}
                  />
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
                    name="startTime"
                    placeholder='start time'
                    onChange={updateStartTime}
                    value={startTime}
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
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="virtual"
                    placeholder='virtual'
                    onChange={updateVirtual}
                    value={virtual}
                  />
                </div>
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
