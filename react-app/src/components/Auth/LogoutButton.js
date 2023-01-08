import React from 'react';
import { useDispatch } from 'react-redux';
import { removeAllFriends } from '../../store/friend';
import { removeAllOpenRquests, removeOpenRequest } from '../../store/openRequest';
import { logout } from '../../store/session';
import { removeFriendTransactions, removeTransaction, removeUserTransactions } from '../../store/transactons';
import { removeAllUsers, removeNonFriendUsers, removeSelectedUser } from '../../store/user';
import './Auth.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = (e) => {
    dispatch(logout())
      .then(() => {
        dispatch(removeSelectedUser());
        dispatch(removeAllUsers());
        dispatch(removeNonFriendUsers());
        dispatch(removeUserTransactions());
        dispatch(removeFriendTransactions());
        dispatch(removeTransaction());
        dispatch(removeOpenRequest());
        dispatch(removeAllOpenRquests());
        dispatch(removeAllFriends());
      });
  };

  return <button onClick={onLogout} className='logout-butt'>Logout</button>;
};

export default LogoutButton;
