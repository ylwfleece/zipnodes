import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createPolitic, getPolitics } from '../../store/politics';
import DateTimePicker from 'react-datetime-picker'
import logo from '../auth/zipnodes_logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PoliticForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notify = (msg) => toast(msg);
  const user = useSelector((state) => state.session.user);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [question, setQuestion] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const politic = await dispatch(createPolitic(user.id, title, description, question, endTime));
    notify('Successfully created politic: ' + title);
    history.push(`/politic/${politic.id}`);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const updateEndTime = (e) => {
    setEndTime(e);
  };


  return (
    <div className='page-container'>
      <div className='container'>
        <div>
          <div className='order-form-container'>
            <div className='flex-container' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={logo} alt='logo' style={{ padding: '5px 5rem' }} />
            </div>
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <form onSubmit={onSubmit}>
                <div className='field-inputs' style={{height: '50px'}}>
                <textarea
                    style={{padding: '2px', height: '100%', width: '100%', resize: 'none', border: 'none', backgroundColor: 'rgb(250, 250, 250)'}}
                    onChange={updateTitle}
                    value={title}
                    placeholder='title'
                    maxLength='100' minLength='1'
                  >
                  </textarea>
                </div>
                <div className='field-inputs' style={{height: '80px'}}>
                  <textarea
                    style={{padding: '2px', height: '100%', width: '100%', resize: 'none', border: 'none', backgroundColor: 'rgb(250, 250, 250)'}}
                    onChange={updateDescription}
                    value={description}
                    placeholder='description'
                    maxLength='225' minLength='1'
                  >
                    
                  </textarea>
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="question"
                    placeholder='question'
                    onChange={updateQuestion}
                    value={question}
                  />
                </div>
                <p style={{marginBottom: '0px'}}>end date and time: </p>
                <DateTimePicker
                      onChange={updateEndTime}
                      value={endTime}
                    />
                <div className='submit-button-container' style={{ marginTop: '5px' }}>
                  <button type="submit" className='blue-submit-button'>Submit Politic</button>
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

export default PoliticForm;
