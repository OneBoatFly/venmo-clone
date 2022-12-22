import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFriend, fetchAllFriends } from '../../store/friend';
import { fetchNonFriendUsers } from '../../store/user';
import './FriendPage.css';

export default function AllFriends({ userFriends }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState('')

    const handleUnfriend = async (friend) => {
        console.log('unfriend handler')
        const data = await dispatch(deleteFriend(friend.id));

        if (data) {
            setErrors(data)
        }

        dispatch(fetchNonFriendUsers());
        dispatch(fetchAllFriends())        
    }

    return (
        <>
        {errors.length > 0 &&
            <div className='auth-error-div'>
                <span>{errors}</span>
            </div>
        }        
        {userFriends.map((friend, idx) => {
            return (
                <div key={idx}>
                    <div className='friend-single-div'>
                        <img className='friend-profile-pic' src={friend.imageUrl} alt="" />
                        <div className='friend-info-div'>
                            <span className='friend-name'>{friend.username} </span>
                            <span className='friend-email'>@{friend.email}</span>
                        </div>
                        <button className='unfriend-button' onClick={() => handleUnfriend(friend)}>Unfriend</button>
                    </div>
                    <hr className='friend-divider'></hr>
                </div>
            )
        })}
        </>
    )
}
