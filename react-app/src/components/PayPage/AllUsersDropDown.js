import React from 'react'
import { useSelector } from 'react-redux';
import './AllUsersDropDown.css';

export default function AllUsersDropDown({ setRecipient, setShowAllUsers, setRecipients, setToUserIds }) {
    const allUsers = useSelector(state => state.user.allUsers);
    const user = useSelector(state => state.session.user);

    const handleClick = (e, singleUser) => {
        console.log(e)
        setRecipient('');
        setRecipients(prev => [...prev, singleUser.username]);
        setToUserIds(prev => [...prev, singleUser.id]);
        setShowAllUsers(false)
    }

  return (
    <div className='all-users-div'>
        <h4>People</h4>
        {allUsers.map(singleUser => {
            console.log('singleUser', singleUser.id)
            if (singleUser.id === user.id) return null;
            return (
                <div key={singleUser.id} className='all-users-single-div' onClick={(e) => handleClick(e, singleUser)}>
                    <img src={singleUser.imageUrl} alt='' className='all-user-profile-pic' />
                    <div className='all-user-name-email-div'>
                        <span className='all-user-username'>{singleUser.username}</span>
                        <span>@{singleUser.email}</span>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
