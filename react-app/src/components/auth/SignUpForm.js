import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
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
  const matchPasswordRef = useRef(null);

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmit(true);

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

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
    const newErrors = [];

    if (password !== repeatPassword) {
      newErrors.push("Please enter the same password");
    }

    if (username === "") {
      newErrors.push("Please enter your username.");
    }

    if (email === "") {
      newErrors.push("Please enter your email.");
    }

    if (password === "") {
      newErrors.push("Please enter the password.");
    }

    if (repeatPassword === "") {
      newErrors.push("Please confirm your password.");
    }

    setErrors(newErrors);
  }, [repeatPassword, username, email, password]);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-div'>
      <div className='auth-sub-div'>
        <NavLink to='/' exact={true} className='vinmo-a'>
          <span className='vinmo-span'>Vinmo</span>
        </NavLink>
        <span className='login-page-mid-span'>Sign up</span>
        <form className="auth-form" onSubmit={onSignUp}>
          <div>
            {hasSubmit && errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='auth-form-input-wrapper'>
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
          <div className='auth-form-input-wrapper'>
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
          <div className='auth-form-input-wrapper'>
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
          <div className='auth-form-input-wrapper'>
            <label htmlFor='repeat_password' className='auth-label' ref={matchPasswordRef}>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              onFocus={() => matchPasswordRef.current.classList.add('hasInput')}
              onBlur={() => matchPasswordRef.current.classList.remove('hasInput')}               
            ></input>
          </div>
          <button type='submit' className='login-button'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
