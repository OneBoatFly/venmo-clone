import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Auth.css';
import validator from 'validator';

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [hasSubmit, setHasSubmit] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const emailDivRef = useRef(null);
  const passwordDivRef = useRef(null);  

  const onLogin = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    if (Object.keys(errors).length) {
      if (errors.email) emailDivRef.current.classList.add('hasErrors')
      if (errors.password) passwordDivRef.current.classList.add('hasErrors')
      return;
    }

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  useEffect(() => {
    if (!hasSubmit) return;
    if (errors.email) emailDivRef.current.classList.add('hasErrors')
    if (errors.password) passwordDivRef.current.classList.add('hasErrors')
  }, [errors, hasSubmit])
    
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const newErrors = {};

    if (email === "") {
      newErrors['email'] = "Please enter your email."
    } else if (!validator.isEmail(email)) {
      newErrors['email'] = "Please enter a valid email."
    } else {
      delete newErrors['email']
      emailDivRef.current.classList.remove('hasErrors')
    }

    if (password === "") {
      newErrors['password'] = "Please enter the password."
    } else {
      delete newErrors['password']
      passwordDivRef.current.classList.remove('hasErrors')
    }

    setErrors(newErrors);
  }, [email, password]);

  if (user) {
    return <Redirect to='/transactions' />;
  }

  return (
    <div className='auth-div'>
      <div className='auth-sub-div'>
        <NavLink to='/' exact={true} className='vinmo-a'>
          <span className='vinmo-span'>Vinmo</span>
        </NavLink>
        <span className='login-page-mid-span'>Log in or sign up</span>
        <form className="auth-form" onSubmit={onLogin}>
          {/* {console.log('sign in form errors', errors)} */}
          <div className='auth-form-error-input-wrapper'>
            <div className='auth-form-input-wrapper' ref={emailDivRef}>
              <div className='auth-form-label-input-wrapper'>
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
              <i className="fa-solid fa-exclamation"></i>
            </div>
            {hasSubmit && errors.email &&
              <div className='auth-error-div'>
                <span>{errors.email}</span>
              </div>
            }
          </div>
          <div className='auth-form-error-input-wrapper'>
            <div className='auth-form-input-wrapper' ref={passwordDivRef}>
              <div className='auth-form-label-input-wrapper'>
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
              <i className="fa-solid fa-exclamation"></i>
            </div>
            {hasSubmit && errors.password &&
              <div className='auth-error-div'>
                <span>{errors.password}</span>
              </div>
            }
          </div>
          <button type='submit' className='login-button'>Log in</button>
          <NavLink to='/sign-up' exact={true} className='sign-up-a log-in-page'>
            Sign up
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
