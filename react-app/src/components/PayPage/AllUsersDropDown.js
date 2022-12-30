import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './AllUsersDropDown.css';

export default function AllUsersDropDown({ recipients, setRecipient, setShowAllUsers, setRecipients, setToUserIds, keyword }) {
    const allUsers = useSelector(state => state.user.allUsers);
    const user = useSelector(state => state.session.user);
    const [usersKeyword, setUsersKeyword] = useState(allUsers);

    const handleClick = (e, singleUser) => {
        // console.log(e.target)
        setRecipient('');
        if (recipients.includes(singleUser.username)) return
        setRecipients(prev => [...prev, singleUser.username]);
        setToUserIds(prev => [...prev, singleUser.id]);
        setShowAllUsers(false)
    }

    useEffect(() => {
        if (!allUsers) return;
        if (allUsers.length === 0) return;

        let nonFriendsArr = []
        nonFriendsArr = allUsers.filter(user => {
            return user.username.toLowerCase().includes(keyword.toLowerCase())
        })

        setUsersKeyword(nonFriendsArr);
    }, [keyword, allUsers])

  return (
    <div className='all-users-div'>
        <h4>People</h4>
        {usersKeyword.map(singleUser => {
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
