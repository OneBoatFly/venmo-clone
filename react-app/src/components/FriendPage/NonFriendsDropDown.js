import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFriendRequest, fetchAllFriends } from '../../store/friend';
import { fetchNonFriendUsers } from '../../store/user';
import './NonFriendsDropDown.css';

export default function NonFriendsDropDown() {
    const nonFriends = useSelector(state => state.user.nonFriendUsers);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState('')

    const handleAdd = async (singleUser) => {
        const data = await dispatch(createFriendRequest(singleUser.id));

        if (data) {
            setErrors(data)
        }

        dispatch(fetchNonFriendUsers());
        dispatch(fetchAllFriends())
    }

    return (
        <div className='non-friends-div'>
            <h4>People</h4>
            {errors.length > 0 &&
                <div className='auth-error-div'>
                    <span>{errors}</span>
                </div>
            }
            {nonFriends.map(singleUser => {
                // console.log('singleUser - nonFriend', singleUser.id)
                return (
                    <div key={singleUser.id} className='non-friends-single-div'>
                        <img src={singleUser.imageUrl} alt='' className='non-friends-profile-pic' />
                        <div className='non-friends-name-email-div'>
                            <span className='non-friends-username'>{singleUser.username}</span>
                            <span>@{singleUser.email}</span>
                        </div>
                        <button className='add-friend-button' onClick={() => handleAdd(singleUser)}>Add Friend</button>
                    </div>
                )
            })}
        </div>
    )
}
