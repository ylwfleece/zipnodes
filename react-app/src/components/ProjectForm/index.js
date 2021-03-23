import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjects } from '../../store/projects';
import DateTimePicker from 'react-datetime-picker'
import logo from '../auth/zipnodes_logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notify = (msg) => toast(msg);
  const user = useSelector((state) => state.session.user);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [karmaPerShare, setKarmaPerShare] = useState("");
  const [costPerShare, setCostPerShare] = useState("");
  const [totalShares, setTotalShares] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const project = await dispatch(createProject(user.id, title, description, karmaPerShare, costPerShare, totalShares, endTime));
    notify('Successfully created project: ' + title);
    history.push(`/project/${project.id}`);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateKarmaPerShare = (e) => {
    setKarmaPerShare(e.target.value);
  };

  const updateEndTime = (e) => {
    setEndTime(e);
  };

  const updateCostPerShare = (e) => {
    setCostPerShare(e.target.value);
  };

  const updateTotalShares = (e) => {
    setTotalShares(e.target.value);
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
                    type="number"
                    name="karmaPerShare"
                    placeholder='karma per share'
                    onChange={updateKarmaPerShare}
                    value={karmaPerShare}
                  />
                </div>
                <div className='field-inputs'>
                  <input
                    type="number"
                    name="costPerShare"
                    placeholder='cost per share'
                    onChange={updateCostPerShare}
                    value={costPerShare}
                  />
                </div>
                <div className='field-inputs'>
                  <input
                    type="number"
                    name="totalShares"
                    placeholder='total shares'
                    onChange={updateTotalShares}
                    value={totalShares}
                  />
                </div>
                <DateTimePicker
                      onChange={updateEndTime}
                      value={endTime}
                    />
                <div className='submit-button-container' style={{ marginTop: '18px' }}>
                  <button type="submit" className='blue-submit-button'>Submit Project</button>
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

export default ProjectForm;
