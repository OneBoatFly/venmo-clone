import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/HomePage/HomePage';
import AccountPage from './components/AccountPage/AccountPage';
import Footer from './components/Footer/Footer';
import PayPage from './components/PayPage/PayPage';
import OpenRequestPage from './components/OpenRequestPage/OpenRequestPage';
import FriendPage from './components/FriendPage/FriendPage';

function App() {
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        {!user &&
          <Route path='/' exact={true} >
            <HomePage />
          </Route>
        }
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/account' exact={true} >
          <AccountPage />
        </ProtectedRoute>
        <ProtectedRoute path='/pay' exact={true} >
          <PayPage />
        </ProtectedRoute>
        <ProtectedRoute path='/open' exact={true} >
          <OpenRequestPage />
        </ProtectedRoute>               
        <ProtectedRoute path='/friends' exact={true} >
          <FriendPage />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
