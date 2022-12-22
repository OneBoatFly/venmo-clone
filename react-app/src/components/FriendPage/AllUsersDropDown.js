import React from 'react'
import { useSelector } from 'react-redux';
import './AllUsersDropDown.css';

export default function AllUsersDropDown({ setRecipient, setShowAllUsers, setToUserId }) {
    const allUsers = useSelector(state => state.user.allUsers);

    const handleClick = (user) => {
        setRecipient(user.username);
        setToUserId(user.id)
        setShowAllUsers(false)
    }

  return (
    <div className='all-users-div'>
        <h4>People</h4>
        {allUsers.map(user => {
            return (
                <div key={user.id} className='all-users-single-div' onClick={() => handleClick(user)}>
                    <img src={user.imageUrl} alt='' className='all-user-profile-pic' />
                    <div className='all-user-name-email-div'>
                        <span className='all-user-username'>{user.username}</span>
                        <span>@{user.email}</span>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
