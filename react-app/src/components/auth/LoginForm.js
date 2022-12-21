import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
    
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/account' />;
  }

  return (
    <div className='auth-div'>
      <div className='auth-sub-div'>
        <NavLink to='/' exact={true} className='vinmo-a'>
          <span className='vinmo-span'>Vinmo</span>
        </NavLink>
        <span className='login-page-mid-span'>Log in or sign up</span>
        <form className="auth-form" onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='auth-form-input-wrapper'>
            <label htmlFor='email' className='auth-label' ref={emailRef}>Enter email</label>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
              onFocus={() => emailRef.current.classList.add('hasInput')}
              onBlur={() => emailRef.current.classList.remove('hasInput')}
            />
          </div>
          <div className='auth-form-input-wrapper'>
            <label htmlFor='password' className='auth-label' ref={passwordRef}>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              onFocus={() => passwordRef.current.classList.add('hasInput')}
              onBlur={() => passwordRef.current.classList.remove('hasInput')}
            />
          </div>
          <button type='submit' className='login-button'>Login</button>
          <NavLink to='/sign-up' exact={true} className='sign-up-a log-in-page'>
            Sign up
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
