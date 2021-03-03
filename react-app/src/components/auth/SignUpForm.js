import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [nonprofit, setNonprofit] = useState(false);
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(nonprofit, name, email, password, zipCode);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateNonprofit = (e) => {
    setNonprofit(!nonprofit);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateZipCode = (e) => {
    setZipCode(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='page-container'>
      <div>
        <div className='container'>
          <img  alt='logo' style={{ padding: '5px 5rem' }} />
          <div className='paragraph-container'>
            <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '18px' }}>Sign up to help more.</p>
          </div>
          <form onSubmit={onSignUp}>
          <div className='field-inputs'>
            <label for="nonprofit">
                Sign up as nonprofit?
            </label>
            <input
              type="checkbox"
              name="nonprofit"
              placeholder='First name'
              onChange={updateNonprofit}
              value={nonprofit}
            ></input>
          </div>
            {nonprofit ? 
              <>
                <div className='field-inputs'>
                <input
                  type="text"
                  name="name"
                  placeholder='Name'
                  onChange={updateName}
                  value={name}
                ></input>
                </div> 
              </> : 
              <>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="firstname"
                    placeholder='First name'
                    onChange={updateFirstName}
                    value={firstName}
                  ></input>
                </div>
                <div className='field-inputs'>
                  <input
                    type="text"
                    name="lastname"
                    placeholder='Last name'
                    onChange={updateLastName}
                    value={lastName}
                  ></input>
                </div>
              </>
            }
            <div className='field-inputs'>
              <input
                type="text"
                name="zipCode"
                placeholder='Zip Code'
                onChange={updateZipCode}
                value={zipCode}
              ></input>
            </div>
            <div className='field-inputs'>
              <input
                type="text"
                name="email"
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='field-inputs'>
              <input
                type="password"
                name="password"
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='field-inputs'>
              <input
                type="password"
                name="repeat_password"
                placeholder='Confirm password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className='flex-container' style={{ justifyContent: 'center' }}>
              <div className='normalize-text file-input ' >
              </div>
            </div>
            <div className='submit-button-container' style={{ marginTop: '18px' }}>
              <button type="submit" className='blue-submit-button'>Sign Up</button>
            </div>
          </form>
          <div className='errors-container'>
          </div>
        </div>
        <div className='container redirect-container'>
          <p>Have an account? <nobr><a href='/login'>Log in</a></nobr></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
