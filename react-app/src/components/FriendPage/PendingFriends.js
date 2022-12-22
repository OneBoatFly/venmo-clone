import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { editFriendRequest, fetchAllFriends } from '../../store/friend';
import { fetchNonFriendUsers } from '../../store/user';
import './FriendPage.css';

export default function AllFriends({ userPendingFroms, userPendingTos }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState('')

    const handleAccept = async (friend) => {
        console.log('Accept handler', friend)
        const data = await dispatch(editFriendRequest(friend.id));

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
            {userPendingTos.map((friend, idx) => {
                return (
                    <div key={friend.id}>
                        <div className='friend-single-div'>
                            <img className='friend-profile-pic' src={friend.imageUrl} alt="" />
                            <div className='friend-info-div'>
                                <span className='friend-name'>Invitation from <b>{friend.username}</b></span>
                                <span className='friend-email'>@{friend.email}</span>
                            </div>
                            <button className='accept-friend-button' onClick={() => handleAccept(friend)}>Accept</button>
                        </div>
                        <hr className='friend-divider'></hr>
                    </div>
                )
            })}
            {userPendingFroms.map((friend, idx) => {
                return (
                    <div key={friend.id}>
                        <div className='friend-single-div'>
                            <img className='friend-profile-pic' src={friend.imageUrl} alt="" />
                            <div className='friend-info-div'>
                                <span className='friend-name'>Invitation to <b>{friend.username}</b></span>
                                <span className='friend-email'>@{friend.email}</span>
                            </div>
                        </div>
                        <hr className='friend-divider'></hr>
                    </div>
                )
            })}
        </>
    )
}
