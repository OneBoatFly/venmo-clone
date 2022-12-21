import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import validator from 'validator';

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [hasSubmit, setHasSubmit] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const usernameDivRef = useRef(null);
  const emailDivRef = useRef(null);
  const passwordDivRef = useRef(null);
  const repeatPasswordDivRef = useRef(null);

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    if (Object.keys(errors).length) {
      if (errors.username) usernameDivRef.current.classList.add('hasErrors')
      if (errors.email) emailDivRef.current.classList.add('hasErrors')
      if (errors.password) passwordDivRef.current.classList.add('hasErrors')
      if (errors.repeatPassword) repeatPasswordDivRef.current.classList.add('hasErrors')
      return;
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    if (!hasSubmit) return; 
    if (errors.username) usernameDivRef.current.classList.add('hasErrors')
    if (errors.email) emailDivRef.current.classList.add('hasErrors')
    if (errors.password) passwordDivRef.current.classList.add('hasErrors')
    if (errors.repeatPassword) repeatPasswordDivRef.current.classList.add('hasErrors')
  }, [errors, hasSubmit])

  const updateUsername = (e) => {
    setUsername(e.target.value);
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

  useEffect(() => {
    const newErrors = {};

    if (username === "") {
      newErrors['username'] = "Please enter your username."
    } else if (username.length < 5) {
      newErrors['username'] = "Username must have 5 or longer characters."
    } else if (username.length > 50) {
      newErrors['username'] = "Username must have 50 or less characters."
    } else {
      delete newErrors['username']
      usernameDivRef.current.classList.remove('hasErrors')
    }

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
    } else if (password.length < 6) {
      newErrors['password'] = "Password must have 6 or longer characters."
    } else {
      delete newErrors['password']
      passwordDivRef.current.classList.remove('hasErrors')
    }

    if (repeatPassword === "") {
      newErrors['repeatPassword'] = "Please confirm your password."
    } else if (password !== repeatPassword) {
      newErrors['repeatPassword'] = "Please enter the same password"
    } else {
      delete newErrors['repeatPassword']
      repeatPasswordDivRef.current.classList.remove('hasErrors')
    }

    setErrors(newErrors);
  }, [repeatPassword, username, email, password]);

  if (user) {
    return <Redirect to='/account' />;
  }

  return (
    <div className='auth-div'>
      <div className='auth-sub-div'>
        <NavLink to='/' exact={true} className='vinmo-a'>
          <span className='vinmo-span'>Vinmo</span>
        </NavLink>
        <span className='login-page-mid-span'>Sign up</span>
        <form className="auth-form" onSubmit={onSignUp}>
          {console.log('sign up form errors', errors)}
          <div className='auth-form-error-input-wrapper'>
            <div className='auth-form-input-wrapper' ref={usernameDivRef}>
              <div className='auth-form-label-input-wrapper'>
                <label htmlFor='username' className='auth-label' ref={usernameRef}>Enter username</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  onFocus={() => usernameRef.current.classList.add('hasInput')}
                  onBlur={() => usernameRef.current.classList.remove('hasInput')}               
                ></input>
              </div>
              <i className="fa-solid fa-exclamation"></i>
            </div>
            {hasSubmit && errors.username &&
              <div className='auth-error-div'>
                <span>{errors.username}</span>
              </div>
            }
          </div>
          <div className='auth-form-error-input-wrapper'>
            <div className='auth-form-input-wrapper' ref={emailDivRef}>
              <div className='auth-form-label-input-wrapper'>
                <label htmlFor='email' className='auth-label' ref={emailRef}>Enter email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  onFocus={() => emailRef.current.classList.add('hasInput')}
                  onBlur={() => emailRef.current.classList.remove('hasInput')}              
                ></input>
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
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  onFocus={() => passwordRef.current.classList.add('hasInput')}
                  onBlur={() => passwordRef.current.classList.remove('hasInput')}                  
                ></input>
              </div>
              <i className="fa-solid fa-exclamation"></i>
            </div>
            {hasSubmit && errors.password &&
              <div className='auth-error-div'>
                <span>{errors.password}</span>
              </div>
            }
          </div>
          <div className='auth-form-error-input-wrapper'>
            <div className='auth-form-input-wrapper' ref={repeatPasswordDivRef}>
              <div className='auth-form-label-input-wrapper'>
                <label htmlFor='repeat_password' className='auth-label' ref={repeatPasswordRef}>Repeat Password</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  onFocus={() => repeatPasswordRef.current.classList.add('hasInput')}
                  onBlur={() => repeatPasswordRef.current.classList.remove('hasInput')}               
                ></input>
              </div>
              <i className="fa-solid fa-exclamation"></i>
            </div>
            {hasSubmit && errors.repeatPassword &&
              <div className='auth-error-div'>
                <span>{errors.repeatPassword}</span>
              </div>
            }
          </div>
          <button type='submit' className='login-button'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
